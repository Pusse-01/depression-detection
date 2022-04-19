# importing libraries 
import speech_recognition as sr 
import os 
from pydub import AudioSegment
from pydub.silence import split_on_silence

r = sr.Recognizer()
print (sr.Microphone.list_microphone_names())
with sr.Microphone() as source:
    r.adjust_for_ambient_noise(source)
    print("Listening...")
    # read the audio data from the default microphone
    audio_data = r.listen(source)
    # audio_data = r.record(source, duration=60)
    print("Recognizing...")
    # convert speech to text
    
    text = r.recognize_google(audio_data, language = 'En', show_all=False)
    print(text)