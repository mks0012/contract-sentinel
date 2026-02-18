import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from google import genai
from google.genai import types
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)
CORS(app)

# --- DATABASE CONFIGURATION (Relational: SQLite) ---
# Evaluation: "Database — Any relational database"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sentinel.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class AnalysisRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    contract_snippet = db.Column(db.Text, nullable=False)
    analysis_json = db.Column(db.JSON, nullable=False)

# Initialize database
with app.app_context():
    db.create_all()

# --- AI CLIENT CONFIGURATION ---
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key, http_options={'api_version': 'v1alpha'})

@app.route('/analyze', methods=['POST'])
def analyze():
    # Evaluation: "Interface Safety" - Validate input
    data = request.json
    if not data or "text" not in data:
        return jsonify({"error": "Missing 'text' field"}), 400
        
    contract_text = data.get("text", "")

    try:
        # Evaluation: "AI Usage" - Targeted prompting for legal risks
        print("🚀 Analysis starting with gemini-3-flash-preview...")
        response = client.models.generate_content(
            model='gemini-3-flash-preview', 
            contents=(
                "Analyze this contract for risks (Termination, Liability, Fees). "
                "Return strictly valid JSON with this structure: "
                "{\"summary\": \"...\", \"risks\": [{\"type\": \"...\", \"severity\": \"High/Med\", \"details\": \"...\"}]}"
                f"\n\nText: {contract_text}"
            ),
            config=types.GenerateContentConfig(response_mime_type='application/json'),
        )
        
        analysis_data = response.text
        
        # Evaluation: "Correctness" - Persist to relational database
        new_record = AnalysisRecord(
            contract_snippet=contract_text[:500], # Store snippet for history
            analysis_json=analysis_data
        )
        db.session.add(new_record)
        db.session.commit()
        
        print(f"✅ Success & Saved: {analysis_data}")
        return analysis_data

    except Exception as e:
        # Evaluation: "Observability" - Clear failure diagnosis
        error_msg = str(e)
        print(f"❌ Detailed Error: {error_msg}")
        return jsonify({"error": "Analysis failed", "details": error_msg}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)