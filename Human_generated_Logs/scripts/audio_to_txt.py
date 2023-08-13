import speech_recognition as sr
from os import path
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

    with sr.AudioFile('Human_generated_Logs/data/audio/sample1.wav') as source:
       audio_text = r.listen(source)

       try:
           text = r.recognize_google(audio_text)
           print('Converting audio transcripts into text ...')
           return text
       except sr.UnknownValueError:
           print('Google Web Speech API could not understand the audio')
       except sr.RequestError as e:
           print(f"Could not request results from Google Web Speech API; {e}")
           
        
text=audio_txt('Human_generated_Logs/data/audio/sample1.mp3','Human_generated_Logs/data/audio/sample1.wav')
print(text)