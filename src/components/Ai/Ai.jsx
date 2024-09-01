import React, { useState, useRef, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';

const Ai = () => {
  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPredicting, setIsPredicting] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const imageRef = useRef(null);
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);

  const URL = 'https://heatzera2004.github.io/TENSORFLOW/my_model/'; // Replace with the correct path to your model

  useEffect(() => {
    const init = async () => {
      try {
        const modelURL = URL + 'model.json';
        const metadataURL = URL + 'metadata.json';
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        setMaxPredictions(loadedModel.getTotalClasses());
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading model:', error);
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
        setPrediction(null);
        setUseWebcam(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    setIsPredicting(true);
    try {
      if (model && (imageRef.current || webcamRef.current)) {
        const img = useWebcam ? webcamRef.current : imageRef.current;
        const predictions = await model.predict(img);
        setPrediction(predictions[0]); // Only showing the top prediction
      }
    } catch (error) {
      console.error('Error during prediction:', error);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleReset = () => {
    setImageSrc(null);
    setPrediction(null);
    setUseWebcam(false);
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
      setImageSrc(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 text-gray-900 flex flex-col items-center justify-center min-h-screen p-8 transition-colors duration-500">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8">AI Disease Classifier</h1>
        <p className="text-lg text-center text-gray-700 mb-4">
          This tool helps you identify potential plant diseases from images. Upload an image or use your webcam to get started.
        </p>
        {isLoading ? (
          <p className="text-lg text-center">Loading model...</p>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setUseWebcam(false)}
                className={`py-3 px-6 rounded-lg font-bold text-white ${
                  !useWebcam ? 'bg-green-600' : 'bg-gray-400'
                } shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
              >
                Upload Image
              </button>
              <button
                onClick={startWebcam}
                className={`py-3 px-6 rounded-lg font-bold text-white ${
                  useWebcam ? 'bg-green-600' : 'bg-gray-400'
                } shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
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
            {imageSrc && (
              <div className="mt-6">
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Captured"
                  className="max-w-full h-auto rounded-lg shadow-md transition-all duration-500 transform hover:scale-105"
                />
              </div>
            )}
            <div className="flex space-x-4 w-full mt-6">
              <button
                onClick={handlePredict}
                disabled={!imageSrc || isLoading || isPredicting}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white ${
                  !imageSrc || isLoading || isPredicting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                } shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500`}
                aria-label="Classify the captured image"
              >
                {isPredicting ? 'Classifying...' : 'Classify Image'}
              </button>
              <button
                onClick={handleReset}
                className="w-full py-3 px-6 rounded-lg font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Reset"
              >
                Reset
              </button>
            </div>
            <div id="label-container" ref={labelContainerRef} className="mt-8 w-full">
              {prediction && (
                <div className="bg-green-50 p-6 rounded-lg shadow-inner">
                  <h2 className="text-2xl font-semibold text-green-700 mb-4">Prediction:</h2>
                  <p className="text-lg text-gray-800">
                    The AI predicts the disease to be <span className="font-bold text-green-600">{prediction.className}</span> with a confidence of <span className="font-bold text-green-600">{Math.round(prediction.probability * 100)}%</span>.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ai;
