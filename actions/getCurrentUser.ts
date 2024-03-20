import { db } from "@/lib/PtismClient";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      include: {
        answers: {
          include: {
            replies: {
              include: {
                replyedBy: true,
              },
            },
            answeredBy: true,
          },
        },
        comment: {
          include: {
            commentBy: true,
          },
        },
        questions: {
          include: {
            answers: {
              include: {
                replies: {
                  include: {
                    replyedBy: true,
                  },
                },
                answeredBy: true,
              },
            },
            askedBy: true,
            comment: {
              include: {
                commentBy: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (e) {
    return null;
  }
}
