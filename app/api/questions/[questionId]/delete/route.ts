import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/PtismClient";
import { NextResponse } from "next/server";

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

    const question = await db.questions.delete({
      where: {
        id: params.questionId,
        askedById: currentUser.id,
      },
    });

    return NextResponse.json(question);
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
}
