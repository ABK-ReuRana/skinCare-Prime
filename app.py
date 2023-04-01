from flask import render_template, jsonify, Flask, redirect, url_for, request
import random
import os
import numpy as np
from keras.applications.mobilenet import MobileNet 
from tensorflow.keras.preprocessing import image

from keras.applications.mobilenet import preprocess_input, decode_predictions
from keras.models import model_from_json
import keras
from keras import backend as K
from werkzeug.utils import secure_filename



app = Flask(__name__)

SKIN_CLASSES = {
  0: 'Actinic Keratoses',
  1: 'Basal Cell Carcinoma',
  2: 'Benign Keratosis',
  3: 'Dermatofibroma',
  4: 'Melanoma',
  5: 'Melanocytic Nevi',
  6: 'Vascular skin lesion'
}



@app.route('/')
def index():
    return render_template('index.html', title='Home')



@app.route('/predict', methods = ['GET', 'POST'])
def upload():
    if request.method == 'POST':
        f = request.files['file'] 
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'static/uploads', secure_filename(f.filename))
        f.save(file_path)    # save Image into upload folder

        j_file = open('models/model.json', 'r')
        loaded_json_model = j_file.read()
        j_file.close()
        model = model_from_json(loaded_json_model)

        model.load_weights('models/model.h5')
        img1 = image.load_img(file_path, target_size=(224,224))
        img1 = np.array(img1)
        img1 = img1.reshape((1,224,224,3))
        img1 = img1/255
        prediction = model.predict(img1)
        pred = np.argmax(prediction)
        disease = SKIN_CLASSES[pred]
        accuracy = prediction[0][pred]
        K.clear_session()
    
    print("Predictions disease: ", disease, "accuracy: ", accuracy*100)
    return disease



if __name__ == "__main__":
    app.run(debug=True)