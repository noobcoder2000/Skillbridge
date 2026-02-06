import { prisma } from '@/lib/prisma';
import RecentQuestions from './RecentQuestions';
import { Session } from 'next-auth';

export default async function RecentQuestionsServer({ session }: { session: Session | null }) {

  if (!session || !session.user?.email) {
    return <RecentQuestions questions={[]} />;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return <RecentQuestions questions={[]} />;
  }

  const questions = await prisma.question.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return <RecentQuestions questions={questions} />;
} 