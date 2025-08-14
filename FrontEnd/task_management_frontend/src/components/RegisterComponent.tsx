import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthenticationContext';
import { RegisterFormData } from '../types/RegistrationFormData';
import { registerSchema } from '../validationSchemas/registerSchema';

const Register = () => {
    const { register } = useAuth();

    const formik = useFormik<RegisterFormData>({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            try {
                await register(values);
            } catch (err) {
                // Error handled by AuthContext toast, no need for local state
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-greenish-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-greenish-100">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create a new account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">sign in to your existing account</Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className={`mt-1 block w-full px-3 py-2 border ${formik.touched.username && formik.errors.username ? 'border-red-400' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                aria-describedby={formik.touched.username && formik.errors.username ? 'username-error' : undefined}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <p id="username-error" className="mt-2 text-sm text-red-600">{formik.errors.username}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`mt-1 block w-full px-3 py-2 border ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                aria-describedby={formik.touched.email && formik.errors.email ? 'email-error' : undefined}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p id="email-error" className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className={`mt-1 block w-full px-3 py-2 border ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                aria-describedby={formik.touched.password && formik.errors.password ? 'password-error' : undefined}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p id="password-error" className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {formik.isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </>
                            ) : 'Create Account'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;