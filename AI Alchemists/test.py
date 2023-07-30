from googletrans import Translator
translator = Translator()

contents = "Hello, my name is Ashish. How are you doing?"

result = translator.translate(contents, dest='hi')
print(result.text)

#now for text2speech

import pyttsx3

text_speech = pyttsx3.init()

answer = input("Enter what is to be done: ")

text_speech.say(answer)
text_speech.runAndWait()