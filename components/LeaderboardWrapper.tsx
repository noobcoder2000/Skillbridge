'use client';

import dynamic from 'next/dynamic';

const Leaderboard = dynamic(() => import('@/components/Leaderboard'), { ssr: false });

export default function LeaderboardWrapper() {
  return <Leaderboard />;
} 