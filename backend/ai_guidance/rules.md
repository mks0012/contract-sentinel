# AI Development & Operational Rules

 1. Interface Safety (Schema Enforcement)
- The AI must strictly output valid JSON.
- If the model encounters an error or ambiguous text, it must return a structured JSON error object: `{"summary": "Error", "risks": []}` to prevent frontend crashes.

 2. Change Resilience (Versioning)
- Use the `v1alpha` API endpoint for all preview models (e.g., Gemini 3 Flash) to ensure compatibility with advanced features like JSON mode.

 3. Observability & Correctness
- Every successful AI transaction must be logged to the server console and persisted to the SQLite `analysis_record` table.
- All 429 (Rate Limit) errors must be caught and returned as a clear user-facing message to prevent "silent failures."