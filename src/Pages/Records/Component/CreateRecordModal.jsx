
import React, { useState } from 'react'
import Modal from './Modal'

const CreateRecordModal = ({isOpen,onClose,onCreate}) => {
    const [foldername,setFolderName]=useState("");
    //to handel creation of folder
    const handelCreate=()=>{
        onCreate(foldername);
        setFolderName("");
    }
  return (
    <Modal
    title='Create Record'
    isOpen={isOpen}
    onClose={onClose}
    onAction={handelCreate}
    actionLabel='Create Folder'
    >
        <div className='grid gap-y-4'>
            <div>
                <label htmlFor="folder-name"
                className='mb-2 block text-sm text-white ml-10'>Record Name</label>
                <div className='relative'>
                <input
                type="text"
                value={foldername}
                onChange={(e) => setFolderName(e.target.value)}
                required
                placeholder="Enter record name"
                className="w-full max-w-xs mx-auto block rounded-md border border-neutral-700 bg-[#13131a] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-blue-600 focus:outline-none"
/>

                </div>

            </div>
        </div>
    </Modal>
  )
}

export default CreateRecordModal