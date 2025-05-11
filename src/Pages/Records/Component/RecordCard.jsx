import React from 'react'
import { IconChevronRight,IconFolder} from '@tabler/icons-react'

const RecordCard = ({ record, onNavigate }) => {
  return (
    <div className="flex flex-col rounded-xl border shadow-sm border-neutral-800 bg-[#1313a] p-4">
      <div className='flex justify-between items-center gap-x-6 p-4 md:p-5'>
        <div className='flex h-11 w-11 items-center justify-center rounded-full text-blue-200'>
          <IconFolder size={50} className="text-green-500" />
        </div>
      </div>
      <a
        onClick={() => onNavigate(record.recordName)}
        className='inline-flex cursor-pointer items-center justify-between rounded-b-xl border-t px-4 py-3 text-sm md:px-5 border-neutral-800 hover:bg-neutral-800 text-neutral-400'
      >
        {record.recordName}
        <IconChevronRight size={25} />
      </a>
    </div>
  );
};

export default RecordCard;