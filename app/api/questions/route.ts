import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/PtismClient";
import { Titillium_Web } from "next/font/google";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const { title, description, expectation, tags } = await req.json();

    if (!title || !description || !expectation || tags.length == 0) {
      return new NextResponse("invalid", { status: 404 });
    }

    const question = await db.questions.create({
      data: {
        title: title,
        tags: tags,
        description: description,
        expection: expectation,
        askedById: currentUser.id,
      },
    });

    return NextResponse.json(question);
  } catch (Err: any) {
    return new NextResponse(Err.message, { status: 500 });
  }
}
