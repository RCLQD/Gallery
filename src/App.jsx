import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './pages/Gallery';
import Folder from './pages/Folder';
import { BentoDemo } from './pages/Files';

function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<Gallery />} />
          <Route path='/:folder_name' element={<Folder />} />
          <Route path='/practice' element={<BentoDemo />} />
        </Routes>
    </Router>
  )
}

export default App