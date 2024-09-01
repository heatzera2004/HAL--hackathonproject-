import React, { useState, useRef, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';

const Ai = () => {
  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const imageRef = useRef(null);
  const labelContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (labelContainerRef.current && maxPredictions > 0) {
      const labelContainer = labelContainerRef.current;
      labelContainer.innerHTML = ''; // Clear previous labels
      for (let i = 0; i < maxPredictions; i++) {
        labelContainer.appendChild(document.createElement('div'));
      }
    }
  }, [maxPredictions]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    try {
      if (model && imageRef.current && imageSrc) {
        const img = new Image();
        img.src = imageSrc;
        img.onload = async () => {
          const prediction = await model.predict(img);
          setPredictions(prediction);
        };
      }
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-green-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-green-700 mb-6">Disease Prediction</h1>
      {isLoading ? (
        <p className="text-lg text-gray-700">Loading model...</p>
      ) : (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4 w-full p-2 border border-gray-300 rounded-md"
            aria-label="Upload an image"
          />
          <button
            onClick={handlePredict}
            disabled={!imageSrc || isLoading}
            className={`w-full py-2 px-4 rounded-md font-bold text-white ${
              !imageSrc || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            } transition-colors`}
            aria-label="Classify the uploaded image"
          >
            Classify Image
          </button>
          {imageSrc && (
            <div className="mt-4">
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Uploaded"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          <div id="label-container" ref={labelContainerRef} className="mt-4">
            {predictions.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-green-700">Predictions:</h2>
                <ul className="list-disc list-inside mt-2">
                  {predictions.map((prediction, index) => (
                    <li key={index} className="text-lg text-gray-800">
                      {prediction.className}: {Math.round(prediction.probability * 100)}%
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ai;
