import { db } from "@/lib/PtismClient";

export default async function getQuestionById(id: string, orderBy: "new" |  "oldest" | undefined) {
  let orderByq: { createdAt: "asc" | "desc" } = { createdAt: "desc" };

  if (orderBy) {
    if (orderBy === "new") {
      orderByq = {
        createdAt: "desc",
      };
    } else if (orderBy === "oldest") {
      orderByq = {
        createdAt: "asc",
      };
    }
  } else {
    orderByq = {
      createdAt: "desc",
    };
  }

  const questions = await db.questions.findUnique({
    where: {
        id: id
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
        orderBy: orderByq,
      },
      askedBy: true,
      comment: {
        include: {
          commentBy: true,
        },
      },
    },
  });

  return questions;
}
