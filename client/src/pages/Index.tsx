import React, { useEffect, useState } from 'react';
import AudioModal from '../components/Modal/AudioModal';

type Props = {};

const Index = (props: Props) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [uploadState, setUploadState] = useState<boolean>(false);

  const handleNeweRecording = () => {
    setUploadState(false);
    setToggleModal(!toggleModal)
  };
  
  const handleUploadRecording = () => {
    setUploadState(true);
    setToggleModal(!toggleModal)
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
      />
    </div>
  );
};

export default Index;
