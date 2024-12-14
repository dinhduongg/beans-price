'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        error: {
          iconTheme: {
            primary: '#ffffff',
            secondary: '#ff4d4f',
          },
          style: { background: '#ff4d4f', color: '#ffffff' },
        },
        success: {
          iconTheme: {
            primary: '#ffffff',
            secondary: '#18bc0e',
          },
          style: { background: '#18bc0e', color: '#ffffff' },
        },
      }}
    />
  )
}
