// components/Leaderboard.tsx
'use client';

import Image from 'next/image';

const dummyData = [
  { name: 'Ananya Sen', points: 1500, avatar: '/avatars/1.png' },
  { name: 'Rahul Roy', points: 1420, avatar: '/avatars/2.png' },
  { name: 'Zoya Khan', points: 1375, avatar: '/avatars/3.png' },
];

export default function Leaderboard() {
  return (
    <div className="bg-gray-100 dark:bg-[#1f1f1f] p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">🏆 Leaderboard</h2>
      <ul className="space-y-4">
        {dummyData.map((user, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white dark:bg-[#2b2b2b] rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold text-gray-600 dark:text-gray-200 w-6 text-center">{index + 1}</span>
              <Image
                src={user.avatar}
                alt={`${user.name} avatar`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-gray-800 dark:text-white">{user.name}</span>
            </div>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{user.points} pts</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
