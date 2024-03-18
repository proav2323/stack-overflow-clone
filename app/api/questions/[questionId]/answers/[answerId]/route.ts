import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/PtismClient";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { questionId: string; answerId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { text } = await req.json();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!params.questionId || !text || !params.answerId) {
      return new NextResponse("invalid id", { status: 402 });
    }

    const question = await db.answers.update({
      where: {
        id: params.answerId,
      },
      data: {
        answer: text,
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { questionId: string; answerId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!params.questionId || !params.answerId) {
      return new NextResponse("invalid id", { status: 402 });
    }

    const question = await db.questions.update({
      where: {
        id: params.questionId,
      },
      data: {
        answers: {
          delete: {
            id: params.answerId,
          },
        },
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
