//not required to import rect as its .jsx extension react will be automatically added so uf we need to add hooks then we need this
import React from 'react'
import Modal from './Modal'
import { IconProgress } from '@tabler/icons-react'

const FileUploadModal = (
    {
        isOpen,
        onClose, //to close the modal
        onFileChange, //handel the file change
        onFileUpload, //file uploading state will be hadeled
        uploading, // if the file is uploading or not
        uploadSucess, // if the uploaad was successfull
        filename}) => {
  return (
    <Modal
    title={'Upload Reports'}
    isOpen={isOpen}
    onClose={onClose}
    onAction={onFileUpload}
    actionLabel={'Upload and Analyze'}
    >
        {/**container for file upload area */}
        <div className='flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-700 text-slate-300 p-8 '>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
          className="h-12 w-12 opacity-75"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
            clipRule="evenodd"
          />
        </svg>


            {/**label and input for file upload */}

            <div className='group'>
                <label htmlFor="fileInputDragDrop"
                className='cursor-pointer font-medium text-blue-700 group-focus-within:underline dark:text-blue-600'>
                    <input type="file" 
                    id='fileInputDragDrop'
                    className='sr-only'
                    aria-describedby='validFileFormats'
                    onChange={onFileChange}/>

                    Browse{" "}
                </label>
                or drag and drop here
            </div>
            <small id="validFileFormats">PNG, PDF , JPEG - Max 5MB</small>
        </div>
        {uploading && (
            <IconProgress 
            size={15}
            className="mr-3 h-7 w-7 animate-spin"
          /> 
        )}
        {/**when file is uploaded successfully */}
        {uploadSucess && (
            <p className='mt-2 text-green-600'>Upload Successfully!</p>

        )}
        <span
        className='text-medium text-left text-white'>{filename}</span>
    </Modal>
  )
}

export default FileUploadModal;