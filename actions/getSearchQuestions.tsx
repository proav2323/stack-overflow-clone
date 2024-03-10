import { db } from "@/lib/PtismClient";

export default async function getSearchQuestions(search: string) {
  const questions = await db.questions.findMany({
    where: {
        OR: [
            {
                title: {
                    contains: search
                }
            },
            {
                description: {
                    contains: search
                }
            },
            {
                expection: {
                    contains: search
                }
            },
            {
               tags: {
                    has: search
                }
            }
        ]
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
