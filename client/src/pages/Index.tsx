import React, { useEffect, useState } from 'react';
import AudioModal from '../components/Modal/AudioModal';
import axios from 'axios';

type Props = {};

const Index = (props: Props) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [uploadState, setUploadState] = useState<boolean>(false);

  const handleNeweRecording = () => {
    setUploadState(false);
    setToggleModal(!toggleModal);
  };

  const handleUploadRecording = () => {
    setUploadState(true);
    setToggleModal(!toggleModal);
  };

  const handleAudioUpload = async (sessionData: any) => {
    const formData = new FormData();
    formData.append('name', sessionData.name);
    formData.append('title', sessionData.title);
    formData.append('audio', sessionData.audio);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/audio',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Upload successful', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div>
      <h2>Welcome back, Georgi</h2>

      <div className="flex">
        <p>Ready to capture another meaningful session?</p>

        <div className="ml-auto space-x-6">
          <button onClick={handleNeweRecording}>record</button>
          <button onClick={handleUploadRecording}>stop</button>
        </div>
      </div>

      <AudioModal
        toggle={toggleModal}
        handleModalToggle={() => setToggleModal(!toggleModal)}
        handleAudioUpload={handleAudioUpload}
      />
    </div>
  );
};

export default Index;
