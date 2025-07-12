import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Form from './Components/Form';
import Admin from './Pages/Admin'; // shows Login + AdminPanel

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
