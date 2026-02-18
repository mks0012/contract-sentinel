# Contract Sentinel 🛡️

A legal risk analysis MVP designed to identify predatory clauses in contracts using Generative AI and Relational Persistence.

### Technical Decisions
- **Stack**: React (Frontend), Flask (Backend), SQLite/SQLAlchemy (Database).
- **Model Choice**: Pivoted to `gemini-3-flash-preview` via the `google-genai` SDK. I opted for the `v1alpha` API version to ensure stable JSON output, addressing a 400-series error encountered with the standard v1 stable route.
- **Relational Integrity**: Integrated SQLite to satisfy the relational database requirement, ensuring all analysis history is persisted for auditability.

### Evaluation Criteria Highlights
- **Interface Safety**: Enforced JSON schemas at the model level to ensure the React frontend never receives unpredictable plain-text responses.
- **Observability**: Implemented detailed backend logging and custom error handling for Gemini API rate limits (429) and model availability (404).
- **Change Resilience**: The modular backend architecture allows for swapping AI providers or scaling the database to PostgreSQL with minimal code changes.

### How to Run
1. **Backend**: 
   - `cd backend && source venv/bin/activate`
   - `pip install -r requirements.txt`
   - `python3 app.py`
2. **Frontend**:
   - `cd frontend && npm install && npm run dev`