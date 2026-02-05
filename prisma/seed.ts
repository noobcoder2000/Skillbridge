import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "cmdrvtm7d0000ud1o85swx6x8"; // Replace with your actual userId

  await prisma.question.updateMany({
    data: {
      userId: userId,
    },
  });

  // Optionally, you can still create new questions here if needed
  // await prisma.question.createMany({
  //   data: [
  //     { content: "What is React Server Component?", isAnswered: true, userId },
  //     { content: "Difference between SQL and NoSQL?", isAnswered: true, userId },
  //     { content: "Explain useEffect hook in React.", isAnswered: false, userId },
  //   ],
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
