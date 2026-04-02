import React, { useState } from 'react';
import axios from 'axios';
import { Activity, AlertTriangle, CheckCircle, Server } from 'lucide-react';

// Use environment variable or default to localhost:8000
const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [response, setResponse] = useState('');
  const [health, setHealth] = useState(null);

  const makeRequest = async (endpoint) => {
    try {
      const res = await axios.get(`${API_BASE_URL}${endpoint}`);
      setResponse(JSON.stringify(res.data, null, 2));
      if (endpoint === '/health') setHealth('healthy');
    } catch (err) {
      setResponse(`Error: ${err.message}\n${JSON.stringify(err.response?.data, null, 2) || ''}`);
      if (endpoint === '/health') setHealth('down');
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-5xl mx-auto space-y-8">
      <header className="flex items-center space-x-4 border-b pb-4">
        <Server className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Mini Log Analytics Platform
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="bg-white p-6 rounded-xl shadow-md border space-y-6">
          <h2 className="text-xl font-semibold flex items-center mb-4">
            <Activity className="w-5 h-5 mr-2 text-gray-500" /> API Actions
          </h2>
          
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => makeRequest('/')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded-lg transition-colors text-left"
            >
              <div className="text-sm text-blue-500 uppercase font-bold tracking-wider mb-1">GET /</div>
              Trigger Standard Request
            </button>

            <button 
              onClick={() => makeRequest('/error')}
              className="bg-red-50 hover:bg-red-100 text-red-700 font-medium py-3 px-4 rounded-lg transition-colors text-left"
            >
              <div className="text-sm text-red-500 uppercase font-bold tracking-wider mb-1">GET /error</div>
              Trigger Simulated Error (50% Chance)
            </button>

            <button 
              onClick={() => makeRequest('/health')}
              className="bg-green-50 hover:bg-green-100 text-green-700 font-medium py-3 px-4 rounded-lg transition-colors text-left flex justify-between items-center"
            >
              <div>
                <div className="text-sm text-green-500 uppercase font-bold tracking-wider mb-1">GET /health</div>
                Check System Health
              </div>
              {health === 'healthy' && <CheckCircle className="w-6 h-6 text-green-500" />}
              {health === 'down' && <AlertTriangle className="w-6 h-6 text-red-500" />}
            </button>
          </div>
          
          <div className="pt-4 border-t mt-6">
             <p className="text-gray-500 text-sm">
               Generate traffic here to view metrics in Prometheus (<a href="http://localhost:9090" target="_blank" rel="noreferrer" className="text-blue-500 underline">Port 9090</a>) and Grafana (<a href="http://localhost:3001" target="_blank" rel="noreferrer" className="text-blue-500 underline">Port 3001</a>).
             </p>
          </div>
        </div>

        {/* Console / Response Output */}
        <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden flex flex-col h-full">
          <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-xs ml-4 font-mono">Response Console</span>
          </div>
          <div className="p-4 flex-grow relative">
            {!response ? (
               <div className="text-gray-500 font-mono text-sm opacity-50 flex items-center justify-center h-full">
                 Waiting for requests...
               </div>
            ) : (
               <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap break-words h-64 overflow-y-auto">
                 {response}
               </pre>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
