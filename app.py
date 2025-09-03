from flask import Flask, send_from_directory
from flask_cors import CORS
import os
import logging

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)
logging.basicConfig(level=logging.INFO)

# Serve index.html at "/"
@app.route("/")
def home():
    return send_from_directory(".", "index.html")

# Example API routes
@app.route("/ping", methods=["GET"])
def ping():
    return {"status": "ok"}

@app.route("/parse", methods=["POST"])
def parse():
    from flask import request, jsonify
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    f = request.files["resume"]
    try:
        text = f.read().decode("utf-8", errors="ignore")
    except Exception as e:
        return jsonify({"error": "Could not read file", "detail": str(e)}), 400

    # tiny keyword-based extractor
    skills_list = [
        "python", "java", "c", "c++", "javascript", "html", "css", "dart",
        "sql", "excel", "tableau", "power bi", "pandas", "numpy",
        "node.js", "nodejs", "express", "mongodb", "flask", "django", "react",
        "aws", "azure", "docker", "kubernetes", "ci/cd", "git", "linux",
        "networking", "security tools", "cybersecurity",
        "machine learning", "deep learning", "tensorflow", "pytorch", "nlp",
        "flutter", "firebase", "cloud", "rest api", "graphql"
    ]

    found = [s.title() for s in skills_list if s in text.lower()]
    app.logger.info("Parsed resume, skills found: %s", found)

    return jsonify({"skills": found})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
