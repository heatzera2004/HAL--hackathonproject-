import React, { useState, useRef } from 'react';
import { fireDB, auth } from '../../firebase/FirebaseConfig';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

const Ai2 = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');
  const imageRef = useRef(null);
  const webcamRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && selectedCrop) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setPrediction(null);
        setUseWebcam(false);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a crop before uploading an image.');
    }
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    try {
      const file = imageRef.current.files[0];
      const formData = new FormData();
      formData.append('image', file);
      formData.append('crop', selectedCrop);

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.error) {
        console.error(result.error);
        setPrediction({ className: 'Error: ' + result.error, probability: 0 });
      } else {
        const disease = result.prediction || "NOT ABLE TO DETECT DISEASE"; // Default value
        const confidence = result.confidence !== undefined ? result.confidence : 0; // Default value

        setPrediction({
          className: disease,
          probability: confidence,
        });

        // Save prediction to Firestore in the predictions collection
        const user = auth.currentUser; // Get the current logged-in user
        if (user) {
          await addDoc(collection(fireDB, 'predictions'), {
            disease: disease,
            confidence: confidence,
            userId: user.uid, // Add the user UID from the current logged-in user
            timestamp: Timestamp.fromDate(new Date()), // Save the current timestamp
          });
        }
      }
    } catch (error) {
      console.error('Error during prediction:', error);
      setPrediction({ className: 'Error during prediction', probability: 0 });
    } finally {
      setIsPredicting(false);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setPrediction(null);
    setUseWebcam(false);
    setSelectedCrop('');
  };

  const startWebcam = () => {
    setUseWebcam(true);
    setPrediction(null);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  };

  const captureWebcamImage = () => {
    if (webcamRef.current) {
      const canvas = document.createElement('canvas');
      const video = webcamRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured_image.png', { type: 'image/png' });
        const formData = new FormData();
        formData.append('image', file);
        handlePredict(formData);
      });
      setImageSrc(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 text-gray-900 flex flex-col items-center justify-center min-h-screen p-8 transition-colors duration-500">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8">Crop Disease Classifier</h1>
        <p className="text-lg text-center text-gray-700 mb-4">
          This tool helps you identify potential plant diseases from images. Upload an image or use your webcam to get started.
        </p>
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 w-full">
            <label className="text-lg text-gray-700 mb-2">Select Crop:</label>
            <select
              className="w-full py-3 px-4 bg-green-50 border border-green-400 rounded-lg shadow-sm text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              aria-label="Select crop"
            >
              <option value="">-- Select Crop --</option>
              <option value="corn">Corn</option>
              <option value="potato">Potato</option>
            </select>
          </div>

          {selectedCrop && (
            <>
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setUseWebcam(false)}
                  className={`py-3 px-6 rounded-lg font-bold text-white ${!useWebcam ? 'bg-green-600' : 'bg-gray-400'} shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  Upload Image
                </button>
                <button
                  onClick={startWebcam}
                  className={`py-3 px-6 rounded-lg font-bold text-white ${useWebcam ? 'bg-green-600' : 'bg-gray-400'} shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
                >
                  Use Webcam
                </button>
              </div>

              {!useWebcam && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mb-4 w-full py-3 px-4 bg-green-50 border border-green-400 rounded-lg shadow-sm text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  aria-label="Upload an image"
                  ref={imageRef}
                />
              )}

              {useWebcam && (
                <div className="relative mb-4">
                  <video
                    ref={webcamRef}
                    autoPlay
                    className="w-full h-auto rounded-lg shadow-md transition-all duration-500 transform hover:scale-105"
                  ></video>
                  <button
                    onClick={captureWebcamImage}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 py-2 px-4 bg-red-500 text-white font-bold rounded-full shadow-lg hover:bg-red-600 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Capture
                  </button>
                </div>
              )}
            </>
          )}

          {imageSrc && (
            <div className="mt-6">
              <img
                src={imageSrc}
                alt="Captured"
                className="max-w-full h-auto rounded-lg shadow-md transition-all duration-500 transform hover:scale-105"
              />
            </div>
          )}

          {imageSrc && (
            <div className="flex space-x-4 w-full mt-6">
              <button
                onClick={handlePredict}
                disabled={isPredicting}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white ${isPredicting ? 'bg-gray-400' : 'bg-green-600'} shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                {isPredicting ? 'Predicting...' : 'Predict Disease'}
              </button>
              <button
                onClick={handleReset}
                className="w-full py-3 px-6 rounded-lg font-bold text-white bg-red-600 shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {prediction && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-700">Prediction</h2>
            {prediction.className && (
              <p className="text-lg text-gray-700">
                Disease: {prediction.className} (Confidence: {prediction.probability}%)
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Ai2;
