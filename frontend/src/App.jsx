import React, { useState } from 'react';
import axios from 'axios';
import { ShieldAlert, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

function App() {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!text) return alert("Please paste some text first.");
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:5001/analyze', { text });
      // Depending on how Gemini returns JSON, it might be a string or object
      const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
      setResults(data);
    } catch (err) {
      setError("Failed to connect to the Sentinel backend. Check if Flask is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-3 mb-8">
          <ShieldAlert className="text-blue-600 w-10 h-10" />
          <h1 className="text-3xl font-bold text-gray-900">Contract Sentinel</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-500" /> Paste Contract
            </h2>
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50"
              placeholder="Paste the legal text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loading ? "Analyzing with Gemini..." : "Scan for Risks"}
            </button>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Risk Report</h2>
            {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
            {!results && !loading && (
              <div className="text-center py-20 text-gray-400">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>No analysis yet. Upload a contract to begin.</p>
              </div>
            )}
            {results && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm font-medium text-blue-800">Summary</p>
                  <p className="text-gray-700 text-sm">{results.summary}</p>
                </div>
                {results.risks.map((risk, i) => (
                  <div key={i} className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        risk.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {risk.severity} Risk
                      </span>
                      <span className="text-sm font-semibold text-gray-800">{risk.type}</span>
                    </div>
                    <p className="text-sm text-gray-600">{risk.details}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;