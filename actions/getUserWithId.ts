import { db } from "@/lib/PtismClient";

export default async function getUserById(id: string) {
  const questions = await db.user.findUnique({
    where: {
      id: id,
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

  return questions;
}
