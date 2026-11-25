import { useState } from "react";
import "./App.css";

const API_URL = "https://ptl4hh0jxj.execute-api.us-east-2.amazonaws.com/default/msqlweb-api";
const API_KEY = "8vm7a7Ayb45tEE5zBLR0n7yvcb3D78a61dFGi4OE"; 

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("SELECT VERSION()");

  const runQuery = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>MySQL Query Runner</h1>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={4}
        placeholder="Enter SQL query..."
      />
      <button onClick={runQuery} disabled={loading}>
        {loading ? "Running..." : "Run Query"}
      </button>

      {error && (
        <div className="result error">
          <pre>Error: {error}</pre>
        </div>
      )}

      {result && (
        <div className="result success">
          <p>{result.count} row{result.count !== 1 ? "s" : ""} returned</p>
          <table>
            <thead>
              <tr>
                {result.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
