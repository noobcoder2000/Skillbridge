// app/api/questions/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: Request) {
  // optional query param: ?mine=1 to return only current user's
  const url = new URL(req.url);
  const mine = url.searchParams.get("mine");

  if (mine === "1") {
    const session = await getServerSession(authOptions);

    // Prefer id from session, else resolve via email
    let userId: string | undefined = (session?.user as any)?.id;
    if (!userId && session?.user?.email) {
      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      userId = dbUser?.id;
    }

    if (!userId) return NextResponse.json([], { status: 200 });

    const posts = await prisma.question.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(posts);
  }

  // Public feed: recent posts with author info
  const posts = await prisma.question.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { user: { select: { id: true, name: true, email: true, image: true } } },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Resolve userId from session id or email
    let userId: string | undefined = (session?.user as any)?.id;
    if (!userId && session?.user?.email) {
      const dbUser = await prisma.user.upsert({
        where: { email: session.user.email },
        update: {},
        create: {
          email: session.user.email,
          name: session.user.name ?? null,
          image: session.user.image ?? null,
        },
        select: { id: true },
      });
      userId = dbUser.id;
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const content = (body.content || "").trim();

    if (!content || content.length < 3) {
      return NextResponse.json({ error: "Content too short" }, { status: 400 });
    }

    // create new question and link to logged-in user
    const newQ = await prisma.question.create({
      data: {
        content,
        userId,
      },
    });

    return NextResponse.json(newQ, { status: 201 });
  } catch (err) {
    console.error("POST /api/questions error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
