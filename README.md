# Contract Sentinel

Contract Sentinel is an AI-powered contract analysis system designed to identify high-risk legal clauses in service agreements and business contracts. The system uses Google's Gemini LLM to extract and classify potential legal risks such as termination traps, liability limitations, and hidden fee clauses.

The application provides a full-stack pipeline where contracts are analyzed through an API, structured insights are generated using AI, and results are visualized in a dashboard for easy review.

---

## Problem

Legal contracts are often lengthy and difficult to interpret without legal expertise. Critical clauses related to termination rights, liability limitations, or hidden fees can easily be overlooked during manual review.

Contract Sentinel automates the first layer of contract analysis by leveraging AI to scan contract text and highlight potential risks, helping users quickly identify problematic clauses before signing agreements.

---

## System Architecture

User → React Frontend  
Frontend → Flask REST API  
Flask API → Gemini LLM  
Gemini → Structured JSON response  
Flask → SQLite Database  
Frontend → Dashboard visualization

---

## Tech Stack

### Frontend
- React
- JavaScript
- Axios

### Backend
- Python
- Flask
- SQLAlchemy

### AI Integration
- Google Gemini API

### Database
- SQLite

---
Install dependencies
pip install -r requirements.txt

Run the backend server

python app.py

Start the frontend

npm install
npm start


## Features

- AI-powered contract clause risk detection
- Identification of termination, liability, and fee clauses
- Structured JSON responses from LLM output
- Persistent storage of contract analysis results
- Historical tracking of analyzed contracts
- Interactive React dashboard for risk visualization

---

## Example AI Output

```json
{
  "termination_clause": {
    "risk_level": "high",
    "description": "Contract allows termination without prior notice."
  },
  "liability_clause": {
    "risk_level": "medium",
    "description": "Liability is capped at a minimal amount relative to contract value."
  },
  "fee_clause": {
    "risk_level": "low",
    "description": "Standard service fee with no hidden charges."
  }
}
