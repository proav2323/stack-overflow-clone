import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/PtismClient";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { text } = await req.json();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!params.questionId || !text) {
      return new NextResponse("invalid id", { status: 402 });
    }

    const question = await db.questions.update({
      where: {
        id: params.questionId,
      },
      data: {
        answers: {
          create: {
            answer: text,
            answeredById: currentUser.id,
          },
        },
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
