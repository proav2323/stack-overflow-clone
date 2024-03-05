import bcrypt from "bcrypt";
import { db } from "@/lib/PtismClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return new NextResponse("invalid data", { status: 404 });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        email: email,
        password: hash,
        name: name,
      },
    });

    return NextResponse.json(user);
  } catch (Err: any) {
    return new NextResponse(Err.message, { status: 500 });
  }
}
