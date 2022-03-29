import streamlit as st
from googletrans import Translator

translator = Translator()

def translate(text):
    result = translator.translate(text,dest='si')
    #print(result.text)
    return result.text

st.title("Depression Detection App")
st.write()
st.write("Translator")
st.write("This application helps to do the necessary translations in the process of making datasets.")
text = st.text_input('Input English text', 'enter text here')
# text = ("My school is my favorite place. I have many friends in my school who always help me. My teachers are very friendly and take care of my parents. Our school is very beautiful. It has many classrooms, a playground, a garden, and canteen. Our school is very big and famous. People living in our city send their children to study here. Our school also provides free education to poor children.")
if text:
    translation = translate(text)
    st.write("Translated text")
    st.write(translation)
    # print (translation)
