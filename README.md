# 🚀 JobGENE – Resume Matcher

JobGENE is a simple web-based tool that helps candidates check how well their resume matches different job roles.  
It extracts skills from uploaded resumes and compares them against predefined job requirements, showing a match percentage.

---

## ✨ Features
- 📄 Upload your resume (`.txt` format supported).  
- 🧠 Backend (Flask) parses and extracts key skills.  
- 💼 Compare against multiple predefined job roles.  
- 📊 Displays a **match percentage** for each role.  
- 🎨 Clean, responsive UI built with **HTML, CSS, JS**.  

---

## 📂 Project Structure
JobGENE/
│── index.html       # Main frontend page
│── style.css        # Stylesheet for the frontend
│── app.js           # Frontend JavaScript logic
│── back.py          # Flask backend
│── requirements.txt # Python dependencies (Flask, flask-cors)
│── LICENSE          # MIT license
│── README.md        # Project documentation
│── .gitignore       # Ignore venv, cache, etc.


## In your project folder, run:

python back.py


This will start your Flask server at:
👉 http://127.0.0.1:5000

## Open the Frontend

Just open index.html in your web browser (double click it, or right-click → Open with → Browser).

Upload a .txt resume file → It will send the file to your Flask backend → Parse skills → Show job match percentages. ✅
