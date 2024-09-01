import React, { useState, useRef, useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';

const remedies = {
  "wheat": {
    "Brown Rust": {
      "en": "Use resistant varieties and apply fungicides like Propiconazole. Crop rotation also helps. Maintain proper field hygiene and avoid excessive nitrogen fertilization.",
      "hi": "प्रतिरोधी किस्मों का उपयोग करें और प्रोपिकोनाजोल जैसे कवकनाशकों का प्रयोग करें। फसल चक्र भी सहायक होता है। उचित क्षेत्र स्वच्छता बनाए रखें और अत्यधिक नाइट्रोजन उर्वरक से बचें।"
    },
    "Leaf Spot": {
      "en": "Apply fungicides such as Chlorothalonil or Mancozeb. Avoid overhead irrigation to reduce humidity. Implement good crop rotation practices.",
      "hi": "कवकनाशक जैसे क्लोरोथालोनिल या मैनकोज़ेब लगाएं। नमी को कम करने के लिए ओवरहेड सिंचाई से बचें। अच्छे फसल चक्र प्रथाओं को लागू करें।"
    }
  },
  "potato": {
    "_Late_Blight": {
      "en": "Apply fungicides like Mancozeb and ensure proper drainage. Remove and destroy infected plants. Avoid high humidity and practice crop rotation.",
      "hi": "मैनकोज़ेब जैसे कवकनाशक लगाएं और उचित जल निकासी सुनिश्चित करें। संक्रमित पौधों को हटा दें और नष्ट कर दें। उच्च नमी से बचें और फसल चक्र का पालन करें।",
      "factors": {
        "environmental": {
          "coolWetWeather": "Late blight thrives in cool (10-25°C or 50-77°F) and wet conditions, especially with high humidity.",
          "heavyRainfall": "Excess water and poor soil drainage can create favorable conditions for the disease.",
          "moistureOnPlantSurfaces": "Dew or rainfall on leaves and tubers for extended periods aids pathogen spread."
        },
        "infectedMaterial": {
          "infectedSeedTubers": "Planting infected tubers can introduce the pathogen.",
          "volunteerPlants": "Infected plants or volunteer tubers can harbor the pathogen."
        },
        "airCirculation": {
          "densePlanting": "Close spacing reduces air circulation, creating a humid microclimate that promotes disease."
        }
      },
      "precautions": {
        "useDiseaseFreeSeed": "Plant certified, disease-free seed tubers. Avoid saved seeds from previous crops with late blight.",
        "cropRotation": "Practice crop rotation with non-solanaceous crops to reduce pathogen survival.",
        "maintainSpacing": "Ensure proper plant spacing to promote good air circulation.",
        "applyFungicides": "Use fungicides like chlorothalonil or mancozeb. Follow local guidelines for timing and rates.",
        "removeInfectedPlants": "Promptly remove and destroy infected plants. Avoid composting; bury or burn them."
      }
    },
    "_Early_Blight": {
      "en": "Manage humidity, use resistant varieties, and apply fungicides. Ensure proper spacing and crop rotation. Regularly inspect plants and remove affected leaves.",
      "hi": "नमी का प्रबंधन करें, प्रतिरोधी किस्मों का उपयोग करें, और कवकनाशक लगाएं। उचित स्पेसिंग और फसल चक्र सुनिश्चित करें। नियमित रूप से पौधों की जांच करें और प्रभावित पत्तियों को हटा दें।",
      "factors": {
        "environmental": {
          "humidity": "High humidity and moisture create ideal conditions for the fungus to thrive.",
          "temperature": "Warm temperatures between 24-29°C (75-85°F) are optimal for the disease.",
          "rainfall": "Frequent rain or overhead irrigation can spread fungal spores and increase infection risk.",
          "airCirculation": "Dense foliage or closely spaced plants can trap moisture, promoting fungal growth."
        },
        "hostSusceptibility": {
          "ageOfPlants": "Older plants or those nearing the end of their growing season are more susceptible.",
          "nutrientDeficiency": "Potassium and nitrogen deficiencies can weaken plants, making them more vulnerable."
        },
        "pathogenPresence": {
          "soilDebris": "The fungus can survive in soil and on plant debris from previous crops.",
          "infectedSeeds": "Planting infected seeds or tubers can introduce the fungus."
        }
      },
      "precautions": {
        "cropRotation": "Avoid planting potatoes or other Solanaceae crops in the same field for at least two years.",
        "resistantVarieties": "Plant potato varieties that are resistant or tolerant to early blight.",
        "irrigation": "Use drip irrigation instead of overhead watering. Water early in the day to allow foliage to dry.",
        "fungicideApplication": "Apply fungicides as a preventive measure during high-risk periods.",
        "spacingAndPruning": "Space plants for good air circulation and prune lower leaves close to the ground."
      }
    },
    "_Healthy": {
      "en": "Don't worry, your crop is healthy. Keep it up!",
      "hi": "चिंता मत करें, आपकी फसल स्वस्थ है। ऐसे ही बनाए रखें!"

  }
  },
  "rice": {
    "Leaf Blast": {
      "en": "Use fungicides like Tricyclazole and avoid excess nitrogen fertilizer. Implement proper water management and use resistant rice varieties.",
      "hi": "ट्राइसाइक्लाजोल जैसे कवकनाशक का उपयोग करें और अत्यधिक नाइट्रोजन उर्वरक से बचें। उचित जल प्रबंधन लागू करें और प्रतिरोधी चावल की किस्में का उपयोग करें।"
    },
    "Brown Spot": {
      "en": "Apply fungicides such as Pyraclostrobin. Avoid over-fertilization and maintain good water management practices.",
      "hi": "पाय्राक्लोस्ट्रोबिन जैसे कवकनाशक लगाएं। अत्यधिक उर्वरक से बचें और अच्छे जल प्रबंधन प्रथाओं को बनाए रखें।"
    }
  },
  "corn": {
    "Common Rust": {
      "en": "Use resistant varieties and apply fungicides like Mancozeb. Remove and destroy infected debris and practice crop rotation.",
      "hi": "प्रतिरोधी किस्मों का उपयोग करें और मैनकोज़ेब जैसे कवकनाशक लगाएं। संक्रमित मलबे को हटा दें और नष्ट कर दें और फसल चक्र का पालन करें।"
    },
    "Gray Leaf Spot": {
      "en": "Improve air circulation, reduce humidity, and apply fungicides. Use resistant varieties and avoid excessive nitrogen.",
      "hi": "वायु परिसंचरण में सुधार करें, नमी को कम करें, और कवकनाशकों का उपयोग करें। प्रतिरोधी किस्मों का उपयोग करें और अत्यधिक नाइट्रोजन से बचें।"
    }
  },
  "sugarcane": {
    "Blight": {
      "en": "Use disease-free seed and remove infected plants. Avoid water stress and improve field drainage.",
      "hi": "रोगमुक्त बीज का उपयोग करें और संक्रमित पौधों को हटा दें। जल तनाव से बचें और खेत की जल निकासी में सुधार करें।"
    },
    "Rust": {
      "en": "Apply fungicides like Propiconazole and improve air circulation. Practice crop rotation and avoid overhead irrigation.",
      "hi": "प्रोपिकोनाजोल जैसे कवकनाशक लगाएं और वायु परिसंचरण में सुधार करें। फसल चक्र का पालन करें और ओवरहेड सिंचाई से बचें।"
    }
  },
  
};

const Ai = () => {
  const [model, setModel] = useState(null);
  const [maxPredictions, setMaxPredictions] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [remedy, setRemedy] = useState(null);
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
        setRemedy(null);
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
        const nonZeroPredictions = predictions.filter(p => p.probability > 0);
        const topPrediction = nonZeroPredictions.length > 0 ? nonZeroPredictions.reduce((max, p) => (p.probability > max.probability ? p : max), nonZeroPredictions[0]) : null;

        if (topPrediction) {
          setPrediction(topPrediction);
          // Fetch the remedy based on the disease name and crop type
          const crop = topPrediction.className.split('__')[0].toLowerCase(); // Assuming the crop type is part of the class name
          const disease = topPrediction.className.split('__').slice(1).join(' '); // Assuming the disease name follows the crop type
          console.log(crop)
          console.log(disease)
          if (remedies[crop] && remedies[crop][disease]) {
            setRemedy(remedies[crop][disease]);
          } else {
            setRemedy({ "en": "No specific remedy found for this disease.", "hi": "इस रोग के लिए कोई विशेष इलाज नहीं मिला।" });
          }
        } else {
          setRemedy({ "en": "No specific remedy found.", "hi": "कोई विशेष इलाज नहीं मिला।" });
        }
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
    setRemedy(null);
    setUseWebcam(false);
  };

  const startWebcam = () => {
    setUseWebcam(true);
    setPrediction(null);
    setRemedy(null);
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
                  {remedy && (
                    <div className="mt-4 p-4 bg-green-100 rounded-lg shadow-inner">
                      <h3 className="text-xl font-semibold text-green-700 mb-2">Remedies:</h3>
                      <p className="text-lg text-gray-800">
                        {remedy.en} <br /> <span className="text-gray-500">{remedy.hi}</span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ai;