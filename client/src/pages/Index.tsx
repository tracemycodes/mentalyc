import React, { useEffect, useState } from 'react';

type Props = {};

interface AudioDevice {
  id: string;
  name: string;
}

const Index = (props: Props) => {
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

  return (
    <div>
      <h2>Welcome back, Georgi</h2>
      <div className="flex">
        <p>Ready to capture another meaningful session?</p>
        <div className="ml-auto space-x-6">
          <button onClick={handleStartRecording}>record</button>
          <button onClick={handleStopRecording}>stop</button>
        </div>
      </div>

      <div className="flex">
        {audioUrl ? (
          <div className="border-4 border-red-800 h-10 min-w-10">
            <audio src={audioUrl} controls />
          </div>
        ) : (
          <div className="border border-blue-800 h-12 w-12">okay</div>
        )}
      </div>
    </div>
  );
};

export default Index;
