import { useState } from "react";
import "./App.css";

const API_URL = "https://ptl4hh0jxj.execute-api.us-east-2.amazonaws.com/default/msqlweb-api";
const API_KEY = "8vm7a7Ayb45tEE5zBLR0n7yvcb3D78a61dFGi4OE";

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(API_URL, {
        headers: { "x-api-key": API_KEY }
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>MySQL Connection Test</h1>
      <button onClick={testConnection} disabled={loading}>
        {loading ? "Connecting..." : "Test Connection"}
      </button>
      {result && (
        <div className="result success">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div className="result error">
          <pre>Error: {error}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
