import { db } from "@/lib/PtismClient";

export default async function getAllQuestio() {
  const questions = await db.questions.findMany({
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
  });

  if (questions.length === 0) {
    return [];
  }

  return questions;
}
