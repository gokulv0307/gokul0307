import os
import pyttsx3
import speech_recognition as sr
import datetime
import requests
import json
engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)
recognizer = sr.Recognizer()

def speak(audio):
    engine.say(audio)
    print(audio)
    engine.runAndWait()

def username():
    speak("Hello! I'm your voice assistant....")
    speak("What can I do for you?")

def takeCommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        audio = r.listen(source)
        try:
            print("Compiling your voice, please wait...")
            text = r.recognize_google(audio, language="en-in")
            print(text)
            return text.lower()
        except Exception as e:
            print(e)
            speak('Unable to recognize your voice')
            return "None"

def process_command(command):
    if 'how are you' in command:
        speak('I am fine. Thank you.')
        speak('How are you')
    elif 'fine' in command or 'good' in command:
        speak('It is good to know that you are fine.')
    elif 'i hate you' in command or 'love you' in command:
        speak('Oh my god, thank you.')
    elif "time" in command:
        response = get_time()
        speak(response)
    elif "date" in command:
        response = get_date()
        speak(response)
    elif "weather" in command:
        location = input("Please specify the location for the weather: ")
        response = get_weather(location)
        speak(response)
    elif "joke" in command:
        response = tell_joke()
        speak(response)
    elif 'bye' in command:
        speak('Goodbye, sir. See you again.')
        exit()
    else:
        response = "can you speak again."
        speak(response)

def get_time():
    current_time = datetime.datetime.now().strftime("%H:%M")
    return f"The current time is {current_time}"

def get_date():
    current_date = datetime.datetime.now().strftime("%Y-%m-%d")
    return f"Today's date is {current_date}"

def get_weather(location):
    api_key = "4bb1040d39ec5a473fd2f9c4c3c7d635"
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {"q": location, "appid": api_key, "units": "metric"} 

    try:
        response = requests.get(base_url, params=params)
        weather_data = response.json()
        temperature = weather_data["main"]["temp"]
        description = weather_data["weather"][0]["description"]
        return f"The weather in {location} is {description} with a temperature of {temperature}°C."
    except Exception as e:
        return f"Sorry, I couldn't fetch the weather information for {location}."

def tell_joke():
    return "Why did the soccer player take so long to eat dinner? Because he thought he couldn’t use his hands."

if __name__ == '__main__':
    clear = lambda: os.system('cls')
    username()

    while True:
        text = takeCommand()
        process_command(text)
