import React from 'react';
// * Context
import { Provider as AuthProvider } from "./context/AuthContext";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <text>One Cloud</text>
      </header>
    </div>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);;
