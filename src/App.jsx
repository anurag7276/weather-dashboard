
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DetailedView from './pages/DetailedView';
import Header from './components/Header'; 

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* I'll pass city coordinates via URL params */}
          <Route path="/city/:lat/:lon" element={<DetailedView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;