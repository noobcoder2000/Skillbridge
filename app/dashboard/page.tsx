// app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LeaderboardModal from '@/components/LeaderboardModal';
import { prisma } from "@/lib/prisma"; // Make sure this path is correct
import RecentQuestions from "@/components/RecentQuestions";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const user = session.user;

  // New: Fetch user from database using email
  const dbUser = await prisma.user.findUnique({
    where: {
      email: user?.email!,
    },
  });

  const questions = await prisma.question.findMany({
    where: { userId: dbUser?.id },
    orderBy: { createdAt: "desc" },
    include: { user: true },
  });

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 relative"> {/* Added relative */}
      {/* Welcome Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-600 mt-1">Here's your progress at a glance.</p>
      </div>

      {/* Leaderboard Button positioned at top-right */}
      <div className="absolute top-6 right-6 z-10"> {/* Adjust top/right as needed */}
        <LeaderboardModal />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Main Content Area (Left/Top) */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Questions Answered" value="24" icon="/check.svg" />
            <StatCard label="Topics Mastered" value="3" icon="/book.svg" />
            <StatCard label="Streak" value="5 Days 🔥" icon="/fire.svg" />
            <StatCard label="Rank" value="#5 in Peer Group" icon="/trophy.svg" />
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ActionButton label="Ask a Question" />
              <ActionButton label="Join a Peer Group" />
              <ActionButton label="Start a Quiz" />
            </div>
          </div>
        </div>

        {/* Removed the old Leaderboard Section div as LeaderboardModal is now absolutely positioned */}
      </div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Recently Asked Questions
      </h2>
      <RecentQuestions questions={questions} />
    </div>
  );
}

// --- Subcomponents ---

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 items-start">
      <Image src={icon} alt="" width={24} height={24} />
      <h3 className="text-sm text-gray-500">{label}</h3>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium transition shadow">
      {label}
    </button>
  );
}
