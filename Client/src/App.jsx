import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '#/layout';
import Auth from '#/auth';
import Notfound from '~/404';
import Home from '~/Home';
import Doctor from '~/doctor/doctor';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
