import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '#/layout';
import Notfound from '~/404';
import Home from '~/Home';
import Login from './components/auth/Login';
function App() {
  return (
    <Router>
      {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      {/* </Layout> */}
    </Router>
  );
}

export default App;
