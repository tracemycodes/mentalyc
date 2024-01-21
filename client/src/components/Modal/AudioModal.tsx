import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaMicrophoneAlt, FaMicrophoneAltSlash } from 'react-icons/fa';

interface UploadProps {
  name: string;
  title: string;
  audio: string | null;
}
interface Props {
  toggle: boolean;
  handleModalToggle: () => void;
  handleAudioUpload: (params: UploadProps) => void;
}

interface AudioDevice {
  id: string;
  name: string;
}

const AudioModal: React.FC<Props> = ({ toggle, handleModalToggle, handleAudioUpload }) => {
  const [open, setOpen] = useState<boolean>(false);
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  const [microphonePermissionState, setMicrophonePermissionState] = useState<
    'granted' | 'prompt' | 'denied'
  >('denied');
  const [availableAudioDevices, setAvailableAudioDevices] = useState<
    AudioDevice[]
  >([]);

  const [selectedAudioDevice, setSelectedAudioDevice] = useState<
    string | undefined
  >(undefined);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [sessionForm, setSessionForm] = useState({
    name: '',
    title: '',
  });

  // Get available audio devices
  const getAvailableAudioDevices = (): Promise<any[]> => {
    return new Promise<any[]>((resolve) => {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        const availableDevices = devices
          .filter((d) => d.kind === 'audioinput')
          .map((d) => {
            return { id: d.deviceId, name: d.label };
          });
        resolve(availableDevices);
      });
    });
  };

  // Permission state for audio record
  const handlePermissionState = (state: 'granted' | 'prompt' | 'denied') => {
    setMicrophonePermissionState(state);
    if (state === 'granted') {
      getAvailableAudioDevices().then((devices) => {
        console.log(devices);
        setAvailableAudioDevices(devices);
        setSelectedAudioDevice(
          devices.find((device) => device.id === 'default')?.id
        );
      });
    }
  };

  useEffect(() => {
    navigator.permissions
      .query({ name: 'microphone' as PermissionName })
      .then((queryResults) => {
        handlePermissionState(queryResults.state);

        queryResults.onchange = (onChangeResult) => {
          if (onChangeResult.target) {
            handlePermissionState(
              (onChangeResult.target as PermissionStatus).state
            );
          }
        };
      });
  }, []);

  const getAudioRef = (audioData: any) => {
    return URL.createObjectURL(new Blob(audioData));
  };

  useEffect(() => {
    setOpen(toggle);
  }, [toggle]);

  const handleStartRecording = () => {
    if (selectedAudioDevice) {
      setIsRecording(true);
      const audio =
        selectedAudioDevice.length > 0
          ? { deviceId: selectedAudioDevice }
          : true;

      navigator.mediaDevices
        .getUserMedia({ audio: audio, video: false })
        .then((stream) => {
          const options = { mimeType: 'audio/webm' };
          const recordedChunks: any[] = [];

          let mediaRecorder = new MediaRecorder(stream, options);

          mediaRecorder.addEventListener('dataavailable', function (e: any) {
            if (e.data.size > 0) recordedChunks.push(e.data);
          });

          mediaRecorder.addEventListener('stop', function () {
            setAudioUrl(getAudioRef(recordedChunks));

            stream.getTracks().forEach(function (track) {
              track.stop();
            });
          });

          mediaRecorder.start();
          setRecorder(mediaRecorder);
        });
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recorder) {
      recorder.stop();
    }
  };

  const handleRecording = (e: any) => {
    e.preventDefault();
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  const handleFormChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value, e.target.name);
    setSessionForm({ ...sessionForm, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: any) => {
    handleAudioUpload({...sessionForm, audio: audioUrl})
  }

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleModalToggle}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Add a new recorded session
                    </Dialog.Title>

                    <div className="mt-8">
                      <form className="flex flex-col space-y-4">
                        <div className="flex flex-col space-y-0.5">
                          <label htmlFor="name" className="text-sm">
                            Client name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleFormChange}
                            value={sessionForm.name}
                            className="border px-3 p-2 rounded"
                            placeholder="Enter clients name"
                          />
                        </div>

                        <div className="flex flex-col space-y-0.5">
                          <label htmlFor="title" className="text-sm">
                            Session title
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleFormChange}
                            value={sessionForm.title}
                            className="border px-3 p-2 rounded text-base"
                            placeholder="Enter session title"
                          />
                        </div>

                        <div className="py-2 flex items-center justify-between">
                          <button
                            className="border bg-red-700 text-white py-2 px-5 text-sm rounded-md shadow-sm"
                            onClick={handleRecording}
                          >
                            {isRecording ? 'Stop' : 'Record'}
                          </button>

                          {isRecording ? (
                            <p className="text-sm">Recording...</p>
                          ) : audioUrl && !isRecording ? (
                            <audio src={audioUrl} controls></audio>
                          ) : (
                            <p className="text-sm">
                              click record to attach audio file
                            </p>
                          )}

                          <div className="">
                            <span className="relative flex h-10 w-10">
                              <span
                                className={`${
                                  isRecording ? 'animate-ping' : ''
                                } absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75`}
                              ></span>
                              <span className="relative inline-flex items-center justify-center rounded-full h-10 w-10 bg-red-500">
                                {isRecording ? (
                                  <FaMicrophoneAlt className="text-xl text-white" />
                                ) : (
                                  <FaMicrophoneAltSlash className="text-xl text-white" />
                                )}
                              </span>
                            </span>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleFormSubmit}
                  >
                    Submit
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleModalToggle}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AudioModal;
