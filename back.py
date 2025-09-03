# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.INFO)

@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"status": "ok"})

@app.route("/parse", methods=["POST"])
def parse():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    f = request.files["resume"]
    try:
        text = f.read().decode("utf-8", errors="ignore")
    except Exception as e:
        return jsonify({"error": "Could not read file", "detail": str(e)}), 400

    # tiny keyword-based extractor (expand as needed)
    skills_list = [
    # Core programming
    "python", "java", "c", "c++", "javascript", "html", "css", "dart",

    # Data & Analytics
    "sql", "excel", "tableau", "power bi", "pandas", "numpy",

    # Web & Backend
    "node.js", "nodejs", "express", "mongodb", "flask", "django", "react",

    # Cloud & DevOps
    "aws", "azure", "docker", "kubernetes", "ci/cd", "git", "linux",

    # Security
    "networking", "security tools", "cybersecurity",

    # ML / AI
    "machine learning", "deep learning", "tensorflow", "pytorch", "nlp",

    # Mobile
    "flutter", "firebase",

    # Misc
    "cloud", "rest api", "graphql"
]

    found = [s.title() for s in skills_list if s in text.lower()]

    app.logger.info("Parsed resume, skills found: %s", found)
    return jsonify({"skills": found})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
