import React, { useEffect, useState } from 'react';
import AudioModal from '../components/Modal/AudioModal';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { RiUpload2Fill } from 'react-icons/ri';
import axios from 'axios';
import io from 'socket.io-client';
import SessionTable from '../components/Table/SessionTable';

type Props = {};

const BASE_URL = process.env.REACT_APP_API_URL;

const Index: React.FC<Props> = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [, /*uploadState*/ setUploadState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionList, setSessionList] = useState<[any][] | null>(null);
  const socket = io(BASE_URL ? BASE_URL : 'http://localhost:8080');

  // useEffect to listen to web socket emitted events for ssesion upload progress
  useEffect(() => {
    socket.on('fileSaved', (data: any) => {
      // update the status and progress of session with web socket
      if (sessionList) {
        setSessionList(
          sessionList?.map((item: any) => {
            return item._id === data.data._id ? data.data : item;
          })
        );
      }
    });
    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    const getSessionData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/audio`);
        if (response.data.status === 'success') {
          setLoading(false);
          setSessionList(response.data.data.sessions);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getSessionData();
  }, []);

  // triggers when a user clicks record, to save a new audio recording.
  const handleNeweRecording = () => {
    setUploadState(false);
    setToggleModal(!toggleModal);
  };

  // triggers when the upload button is clicked, this uploads an already existing audio record form user files.
  const handleUploadRecording = () => {
    setUploadState(true);
    setToggleModal(!toggleModal);
  };

  // Audio session upload function
  const handleAudioUpload = async (sessionData: any) => {
    const formData = new FormData();
    formData.append('name', sessionData.name);
    formData.append('title', sessionData.title);
    formData.append('audio', sessionData.audio);
    formData.append('duration', sessionData.duration);

    try {
      const response = await axios.post(`${BASE_URL}/api/audio`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setToggleModal(!toggleModal);
      if (sessionList) {
        setSessionList([...sessionList, response.data.data]);
      } else {
        setSessionList([response.data.data]);
      }
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  // fuction to remove a deleted session from state when deleted from DB
  const handleDeletedSession = (idx: string) => {
    if (sessionList) {
      setSessionList(sessionList?.filter((item: any) => item._id !== idx));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-[#292D32]">Welcome back, Georgi</h2>

      <div className="flex flex-col lg:flex-row mt-2 lg:items-center">
        <p className="text-[#6C6C6C]">
          Ready to capture another meaningful session?
        </p>

        <div className="lg:ml-auto mt-4 lg:mt-0 justify-between lg:justify-start space-x-6 flex items-center">
          <button
            className="border-2 border-[#DE0D6F] bg-[#DE0D6F] text-white rounded shadow py-1 px-4 flex items-center space-x-2"
            onClick={handleNeweRecording}
          >
            <FaMicrophoneAlt />
            <p>Record</p>
          </button>

          <button
            className="border-2 border-[#DE0D6F] text-[#DE0D6F] rounded shadow py-1 px-4 flex items-center space-x-2"
            onClick={handleUploadRecording}
          >
            <RiUpload2Fill />
            <p>Upload</p>
          </button>
        </div>
      </div>

      <SessionTable
        sessionList={sessionList}
        loading={loading}
        handleDeletedSession={handleDeletedSession}
      />

      <AudioModal
        toggle={toggleModal}
        handleModalToggle={() => setToggleModal(!toggleModal)}
        handleAudioUpload={handleAudioUpload}
      />
    </div>
  );
};

export default Index;
