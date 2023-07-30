import numpy as np
import pandas as pd
import cv2 as cv
import matplotlib.pyplot as plt
import os
import pickle
import tensorflow as tf
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, BatchNormalization
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from keras.models import Model
from sklearn.preprocessing import LabelBinarizer
save_model = tf.keras.models.load_model("Best_DenseNet201.h5",compile=False)


from PIL import Image
import gradio as gr
import numpy as np
from skimage import transform
from tensorflow.keras.utils import load_img, img_to_array
from keras.preprocessing.image import ImageDataGenerator
from keras.applications.vgg16 import preprocess_input

def load(filename):
    my_image = load_img(filename, target_size=(224, 224))

    #preprocess the image
    my_image = img_to_array(my_image)
    my_image = my_image.reshape((1, my_image.shape[0], my_image.shape[1], my_image.shape[2]))
    my_image = preprocess_input(my_image)

    #make the prediction
    prediction = save_model.predict(my_image)
    print(prediction)
    prediction = tf.argmax(tf.nn.softmax(prediction), 1)
    return "Serverity grading:- " + str(int(tf.get_static_value(prediction).item()))
    

import openai

def noob_wrapper(gender, obesity, severity_grading_score, age):

    openai.api_key = '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'
    
    prompt = "You are a arthritis doctor and your patient has osteoarthritis."
    
    messages = [ {"role": "system", "content": 
                prompt} ]
    while True:
        message = f"Severity grade my osteoarthritis is {severity_grading_score} and his gender is {gender} and his age is {age} and his obesity is {obesity}. Renerate a report on this."
        if message:
            messages.append(
                {"role": "user", "content": message},
            )
            chat = openai.ChatCompletion.create(
                model="gpt-3.5-turbo", messages=messages
            )
        reply = chat.choices[0].message.content
        print(f"ChatGPT: {reply}")
        return reply



demo = gr.Interface(fn=noob_wrapper, inputs=[gr.Radio(["Male", "Female", "Undefined"], label="Gender"), gr.Radio(["Yes", "No"], label="Obesity"),gr.Textbox(placeholder="Enter Severity Grading Score"),gr.Textbox(placeholder="Enter Your Age")], outputs="text")
gradio = gr.Interface(fn=load,inputs=gr.Image(type="filepath"),outputs=gr.Label())

demo2 = gr.TabbedInterface([gradio, demo], ["Severity Grading", "Report Generation"])

demo2.launch()