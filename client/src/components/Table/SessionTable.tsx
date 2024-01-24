import React from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import emptySvg from '../../assets/empty-box.svg';
import axios from 'axios';

type Props = {
  sessionList: [any][] | null;
  loading: boolean;
  handleDeletedSession: (idx: string) => void;
};

const SessionTable: React.FC<Props> = ({ sessionList, loading, handleDeletedSession }) => {
  const handleSessionDelete = async (idx: string) => {
    try {
        const deletedSession = await axios.delete(
          `http://localhost:8080/api/audio?id=${idx}`
        );

        if (deletedSession.status === 200) {
            handleDeletedSession(idx)
        }
        
        console.log(deletedSession);
    } catch (error) {
        console.log(error);
    }

  };

  return (
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
              {sessionList &&
                sessionList.map((item: any, index) => (
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
                      <RiDeleteBinLine
                        className="text-red-400 cursor-pointer"
                        onClick={() => handleSessionDelete(item._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {loading && !sessionList ? (
            <div
              role="status"
              className="animate-pulse flex content-between place-content-between align-middle flex-col"
            >
              <div className="h-12 bg-gray-50 dark:bg-gray-200" />
              <div className="h-12 bg-gray-50 dark:bg-gray-200 my-7" />
              <div className="h-12 bg-gray-50 dark:bg-gray-200" />
              <div className="h-12 bg-gray-50 dark:bg-gray-200 my-7" />
              <div className="h-12 bg-gray-50 dark:bg-gray-200" />
            </div>
          ) : !loading && sessionList ? (
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
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionTable;
