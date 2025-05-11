import React from 'react'
import { IconX } from '@tabler/icons-react'

const Modal = ({ title, children, isOpen, onClose, onAction, actionLabel }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
      <div className="relative w-[90%] max-w-md rounded-xl border border-neutral-800 bg-[#1a1a1a] p-6 shadow-lg">
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:text-neutral-400"
        >
          <IconX size={20} />
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          {title}
        </h2>

        {/* Content (Input, etc.) */}
        <div className="mb-6">{children}</div>

        {/* Action Button */}
        <div className="flex justify-center">
          <button
            onClick={onAction}
            className="w-full max-w-xs rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
