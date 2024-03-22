import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/PtismClient";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const { name, image, about } = await req.json();

    if (!name || !image || !about) {
      return new NextResponse("invalid data", { status: 402 });
    }

    const user = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        image: image,
        about: about,
        name: name,
      },
    });

    return NextResponse.json(user);
  } catch (Err: any) {
    return new NextResponse(Err.message, { status: 500 });
  }
}
