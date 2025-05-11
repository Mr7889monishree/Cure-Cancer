import { IconCirclePlus,IconTrash} from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import RecordCard from './Component/RecordCard';
import CreateRecordModal from './Component/CreateRecordModal';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { useStateContext } from '../../context/Index';

const Index = () => {
  const navigate = useNavigate();
  const { user } = usePrivy();

  const {
    records,
    fetchUserRecords,
    createRecord,
    fetchUserByEmail,
    currentUser,
  } = useStateContext();

  const [userRecords, setUserRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserByEmail(user.email.address);
      fetchUserRecords(user.email.address);
    }
  }, [user, fetchUserByEmail, fetchUserRecords]);

  useEffect(() => {
    setUserRecords(records);
    localStorage.setItem('userRecords', JSON.stringify(records));
  }, [records]);

  const handelOpenModal = () => {
    setIsModalOpen(true);
  };

  const handelCloseModal = () => {
    setIsModalOpen(false);
  };

  const createFolder = async (foldername) => {
    try {
      const newRecord = await createRecord({
        userId: currentUser.id,
        recordName: foldername,
        analysisResult: "",
        kanbanRecords: "",
        createdBy: user.email.address,
      });

      if (newRecord) {
        fetchUserRecords(user.email.address);
        handelCloseModal();
      }
    } catch (error) {
      console.log("Error Creating Records", error);
      handelCloseModal();
    }
  };

  const handelNavigate = (name) => {
    const filteredRecords = userRecords.filter((record) => record.recordName === name);
    navigate(`/medical-records/${name}`, {
      state: filteredRecords[0],
    });
  };



  return (
    <div className='flex flex-wrap gap-[26px]'>
      <button
        type='button'
        className='mt-6 inline-flex items-center justify-center gap-x-2 rounded-full border border-neutral-700 bg-[#13131a] px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800'
        onClick={handelOpenModal}
      >
        <IconCirclePlus />
        Create record
      </button>

      <CreateRecordModal
        isOpen={isModalOpen}
        onClose={handelCloseModal}
        onCreate={createFolder}
      />

      <div className='grid w-full sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {userRecords?.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            onNavigate={handelNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
