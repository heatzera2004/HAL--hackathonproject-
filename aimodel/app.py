from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests from the React frontend

# Load class labels for each crop
labels = {
    'corn': {
        0: "Blight",
        1: "Corn___Common_Rust",
        2: "Gray_Leaf_Spot",
        3: "Healthy"
    },
    'potato': {
        0: "Potato___Early_blight",
        1: "Potato___Late_blight",
        2: "Healthy"
    }
}

# Load models for each crop
models = {}

def load_models():
    # Load the models and store them in the 'models' dictionary
    try:
        # Load the corn model
        interpreter_corn = tf.lite.Interpreter(model_path="D:\\HACKATHON PROJECT\\e-seedshop\\aimodel\\corn.tflite")
        interpreter_corn.allocate_tensors()
        models['corn'] = interpreter_corn
        print("Corn model loaded successfully!")
        
        # Load the potato model
        interpreter_potato = tf.lite.Interpreter(model_path="D:\\HACKATHON PROJECT\\e-seedshop\\aimodel\\model_unquant.tflite")
        interpreter_potato.allocate_tensors()
        models['potato'] = interpreter_potato
        print("Potato model loaded successfully!")
    except Exception as e:
        print(f"Error loading models: {e}")

load_models()

# Function to preprocess the image
def preprocess_image(image, input_details):
    # Get expected input shape from the model
    expected_shape = input_details[0]['shape']
    batch_size, height, width, channels = expected_shape

    # Resize the image to match the model's input dimensions
    image = image.resize((width, height))

    # Convert the image to a numpy array and normalize it
    image = np.array(image, dtype=np.float32) / 255.0

    # Expand dimensions to add the batch dimension
    image = np.expand_dims(image, axis=0)  # Shape: (1, height, width, channels)

    # Replicate the image to match the batch size
    if batch_size > 1:
        image_batch = np.repeat(image, batch_size, axis=0)  # Shape: (batch_size, height, width, channels)
    else:
        image_batch = image  # If batch_size is 1, no need to replicate

    return image_batch

# Function to make a prediction
def predict(image_batch, interpreter, input_details, output_details, crop):
    interpreter.set_tensor(input_details[0]['index'], image_batch)
    interpreter.invoke()
    output_data = interpreter.get_tensor(output_details[0]['index'])  # Shape: (batch_size, num_classes)
    print("Raw model output (batch):", output_data)
    # Extract output for the first image
    output_first = output_data[0]
    print("Model output for the first image:", output_first)
    
    
    # Apply softmax to get probabilities
    probabilities = tf.nn.softmax(output_first).numpy()
    predicted_class_index = np.argmax(probabilities)
    confidence = float(np.max(probabilities))
    predicted_class = labels[crop].get(predicted_class_index, "Unknown")
     # Debugging: Print the predicted class index and confidence
    print("Predicted class index:", predicted_class_index)
    print("Confidence:", confidence)
    print("Predicted class label:", predicted_class)
    


    return predicted_class, confidence

# Route to handle image prediction
@app.route('/predict', methods=['POST'])
def predict_disease():
    try:
        # Check if the image file and crop are present
        if 'image' not in request.files or 'crop' not in request.form:
            return jsonify({'error': 'Image or crop not provided'}), 400

        crop = request.form['crop']
        if crop not in models:
            return jsonify({'error': f'Model for crop "{crop}" not available'}), 400

        # Get the uploaded image
        image = Image.open(request.files['image']).convert('RGB')

        # Get the interpreter for the selected crop
        interpreter = models[crop]
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()

        # Preprocess the image
        processed_image_batch = preprocess_image(image, input_details)

        # Make prediction
        predicted_class, confidence = predict(processed_image_batch, interpreter, input_details, output_details, crop)
        if confidence < 0.96:  # Confidence is below threshold
            return jsonify({'prediction': "Unknown disease, still learning"})
        # Return the result as a JSON response
        return jsonify({'prediction': predicted_class, 'confidence': confidence})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
