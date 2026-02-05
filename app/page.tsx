import Image from "next/image";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AuthPrompt from '@/components/AuthPrompt';
import AuthenticatedContent from '@/components/AuthenticatedContent';
import RecentQuestionsServer from "@/components/RecentQuestionsServer";
import AskQuestionForm from "@/components/askquestionsform";


export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {!session ? (
        <AuthPrompt />
      ) : (
        <>
          <AuthenticatedContent session={session} />
          <RecentQuestionsServer session={session} />
        </>
      )}
    </div>
  );
}
