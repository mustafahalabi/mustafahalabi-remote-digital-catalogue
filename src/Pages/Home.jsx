import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FlipBook from './FlipBook';

const Home = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<FlipBook />} />
        <Route path="*" element={<FlipBook />} />
      </Routes>
    </div>
  );
};

export default Home;
