import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Index from './pages/Index';
import {io, Socket} from 'socket.io-client';

const socket: Socket = io("http://localhost:8000")

function App() {
  useEffect(() => {
    function getLocalStream() {
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          // window.localStream = stream;
          // window.localAudio = window.localAudio || new Audio();
          // window.localAudio.srcObject = stream;
        })
        .catch((err) => {
          console.error(`you got an error: ${err}`);
        });
    }

    getLocalStream();
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
      </Route>
    </Routes>
  );
}

export default App;
