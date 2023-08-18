import speech_recognition as sr
import os
from pydub import AudioSegment
import subprocess
                                                                      
# src = "Human_generated_Logs/data/audio/sample1.mp3"
# dst = "Human_generated_Logs/data/audio/sample1.wav"

# # convert wav to mp3                                                            
# sound = AudioSegment.from_mp3(src)
# sound.export(dst, format="wav")

# r = sr.Recognizer()

def audio_txt(source_path, des_path):
    subprocess.call(['ffmpeg', '-i', source_path,des_path])

    r = sr.Recognizer()

    with sr.AudioFile(des_path) as source:
       audio_text = r.listen(source)

       try:
           text = r.recognize_google(audio_text)
           print('Converting audio transcripts into text ...')
           return text
       except sr.UnknownValueError:
           print('Google Web Speech API could not understand the audio')
       except sr.RequestError as e:
           print(f"Could not request results from Google Web Speech API; {e}")
           
directory_path="Human_generated_Logs/data/audio"
file_list = os.listdir(directory_path)
for filename in file_list:
  file = os.path.join(directory_path, filename) 
new, file_extension =file.rsplit('.', 1) 
new_file=new+".wav" 
    
text=audio_txt(file,new_file) 
file_path = "D:/cleanCode/Flipkart_Grid_5.0_InfoSec/Human_generated_Logs/data/input_data/new_audio.txt"


  
# Open the file in write mode
with open(file_path, "w") as f:
    f.write(text)
    
