import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/PtismClient";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  {
    params,
  }: { params: { questionId: string; answerId: string; replyId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { text } = await req.json();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!params.questionId || !text || !params.answerId || !params.replyId) {
      return new NextResponse("invalid id", { status: 402 });
    }

    const question = await db.reply.update({
      where: {
        id: params.replyId,
      },
      data: {
        text: text,
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: { params: { questionId: string; answerId: string; replyId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!params.questionId || !params.answerId || !params.replyId) {
      return new NextResponse("invalid id", { status: 402 });
    }

    const question = await db.questions.update({
      where: {
        id: params.questionId,
      },
      data: {
        answers: {
          update: {
            where: {
              id: params.answerId,
            },
            data: {
              replies: {
                delete: {
                  id: params.replyId,
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
