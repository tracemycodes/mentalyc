import React, { useEffect, useState } from 'react';
import AudioModal from '../components/Modal/AudioModal';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import { RiUpload2Fill } from 'react-icons/ri';
import axios from 'axios';
import io from 'socket.io-client';
import emptySvg from '../assets/empty-box.svg';

type Props = {};

const Index = (props: Props) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [uploadState, setUploadState] = useState<boolean>(false);
  const [sessionList, setSessionList] = useState<[any][]>([]);
  const socket = io('http://localhost:8080');

  useEffect(() => {
    socket.on('fileSaved', (data: any) => {
      console.log(data, 'sace nau');
    });
  }, [socket]);

  useEffect(() => {
    const getSessionData = async () => {
      const response = await axios.get('http://localhost:8080/api/audio');

      console.log(response.data.data.sessions);
      if (response.data.status === 'success') {
        setSessionList(response.data.data.sessions);
      }
    };

    getSessionData();
  }, []);

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
      <h2 className="text-xl font-bold text-[#292D32]">Welcome back, Georgi</h2>

      <div className="flex mt-2 items-center">
        <p className="text-[#6C6C6C]">
          Ready to capture another meaningful session?
        </p>

        <div className="ml-auto space-x-6 flex items-center">
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

      <div className="overflow-auto w-full mt-10 relative sm:mx-0.5 lg:mx-0.5 shadow">
        <div className="py-2 inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-[#FFF0F7] border-b">
                <tr className="">
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Title
                  </th>

                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Duration
                  </th>

                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    File
                  </th>

                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Created At
                  </th>

                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Status
                  </th>

                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  ></th>
                </tr>
              </thead>

              <tbody>
                {sessionList.map((item: any, index) => (
                  <tr
                    className={`${index % 2 !== 0 ? 'bg-[#EEF0F4]/30' : ''}`}
                    key={item._id}
                  >
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.name}
                    </td>

                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.title}
                    </td>

                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.duration}
                    </td>

                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.audioUrl ? (
                        <audio
                          src={item.audioUrl}
                          controls
                          className="h-8 w-[13rem]"
                        />
                      ) : (
                        <p>upload</p>
                      )}
                    </td>

                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td className="text-sm text-gray-900 font-light px-6 py-4">
                      <p
                        className={`${
                          item.sessionStatus === 'saved'
                            ? 'bg-[#DDF2CC]'
                            : 'bg-[#FFEBEB]'
                        } py-1 px-3 text-center rounded shadow`}
                      >
                        {item.sessionStatus}
                      </p>
                    </td>

                    <td className="text-xl text-gray-900 font-light px-6 py-4">
                      <RiDeleteBinLine className='text-red-400 cursor-pointer' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className={`${
                sessionList.length > 0 ? 'hidden' : 'flex'
              } min-h-[30rem] w-full items-center justify-center`}
            >
              <div className="w-[25rem] h-full">
                <img
                  src={emptySvg}
                  className="object-cover w-full h-full"
                  alt="empty"
                />
                <p className="text-center">No session available</p>
              </div>
            </div>
          </div>
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
