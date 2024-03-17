import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/PtismClient";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!params.questionId) {
      return new NextResponse("invalid id", { status: 402 });
    }

    const question = await db.questions.findUnique({
      where: {
        id: params.questionId,
      },
    });

    if (!question) {
      return new NextResponse("invalid id", { status: 402 });
    }

    const saves = [...currentUser.saves, question.id];

    const user = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        saves: saves,
      },
    });

    return NextResponse.json(user);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { questionId: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    if (!params.questionId) {
      return new NextResponse("invalid id", { status: 402 });
    }

    const question = await db.questions.findUnique({
      where: {
        id: params.questionId,
      },
    });

    if (!question) {
      return new NextResponse("invalid id", { status: 402 });
    }

    const saves = currentUser.saves.filter((data) => data !== question.id);

    const user = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        saves: saves,
      },
    });

    return NextResponse.json(user);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
