'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Leaderboard = dynamic(() => import('@/components/Leaderboard'), { ssr: false });

export default function LeaderboardModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Rectangular Button to Open Leaderboard */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 text-xl font-semibold w-full max-w-xs mx-auto"
      >
        Leaderboard
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          {/* Modal Content */}
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl font-bold"
              aria-label="Close Leaderboard"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Leaderboard</h2>
            <Leaderboard />
          </div>
        </div>
      )}
    </>
  );
} 