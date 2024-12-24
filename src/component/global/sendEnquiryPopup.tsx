'use client'

import { useState } from 'react'

interface SendEnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title:string
}

export default function SendEnquiryModal({
  isOpen,
  onClose,
  onConfirm,
  title
}: SendEnquiryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-8 w-full max-w-sm rounded-lg bg-white p-6">
        <div className=" p-4">
          <h2 className="text-left text-xl font-semibold">{title}</h2>
          <p className="mt-2 text-left text-gray-600">
            Are you sure, You want to Send Enquiry!
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={onClose}
              className="rounded-md px-6 py-2 text-gray-600 hover:bg-gray-100 border"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="rounded-md bg-green-500 px-6 py-2 text-white hover:bg-green-600"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

