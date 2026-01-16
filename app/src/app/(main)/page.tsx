import React from 'react';

export default function Main() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to Club ISEN
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Get started by exploring our features
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                    Get Started
                </button>
            </div>
        </main>
    );
}
