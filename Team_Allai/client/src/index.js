import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppcontextProvider } from "./components/context";
import ChatPage from './pages/chat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppcontextProvider>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </AppcontextProvider>
    </BrowserRouter>
  </React.StrictMode>
);