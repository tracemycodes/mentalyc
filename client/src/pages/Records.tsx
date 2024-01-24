import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SessionTable from '../components/Table/SessionTable';

type Props = {};

const BASE_URL = process.env.REACT_APP_API_URL;

const Records: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionList, setSessionList] = useState<[any][] | null>(null);

  // get all therapist sessions
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

  // fuction to remove a deleted session from state when deleted from DB
  const handleDeletedSession = (idx: string) => {
    if (sessionList) {
      setSessionList(sessionList?.filter((item: any) => item._id !== idx));
    }
  };

  return (
    <div>
      <SessionTable
        sessionList={sessionList}
        loading={loading}
        handleDeletedSession={handleDeletedSession}
      />
    </div>
  );
};

export default Records;
