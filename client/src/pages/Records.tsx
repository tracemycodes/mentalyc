import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SessionTable from '../components/Table/SessionTable';

type Props = {};

const Records: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionList, setSessionList] = useState<[any][] | null>(null);

  useEffect(() => {
    const getSessionData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/audio');
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
    <div className="">
      <SessionTable
        sessionList={sessionList}
        loading={loading}
        handleDeletedSession={handleDeletedSession}
      />
    </div>
  );
};

export default Records;
