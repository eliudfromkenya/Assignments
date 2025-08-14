import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthenticationContext';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Task Management System</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Organize your work efficiently
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        A modern task management solution that helps you stay organized and productive.
                    </p>
                </div>
              

                <div className="mt-16 text-center">
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <div className="flex justify-center space-x-4">
                            <Link
                                to="/register"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/login"
                                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
