import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import Make from './pages/Make';
import ChatRoom from './pages/ChatRoom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/make" element={<Make />} />
      <Route path="/:roomID" element={<ChatRoom />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
