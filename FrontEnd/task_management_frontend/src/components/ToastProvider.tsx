import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider: React.FC = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 3000,
        style: {
          background: '#fff',
          color: '#333',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        // Default options for specific types
        success: {
          duration: 3000,
            iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
