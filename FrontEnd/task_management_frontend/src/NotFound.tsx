import React from 'react';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem-6rem)] flex flex-col items-center justify-center bg-greenish-50 text-gray-800 px-4 py-8">
      <Frown size={80} className="text-primary-500 mb-6" />
      <h1 className="text-5xl font-extrabold mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;