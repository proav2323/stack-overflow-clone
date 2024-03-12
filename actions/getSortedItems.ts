import { db } from "@/lib/PtismClient";

export default async function getSortedQuestions({
  tag,
  orderBy,
}: {
  tag: string;
  orderBy: "new" | "unanswered" | "oldest";
}) {
  let query = {};
  let orderByq: { createdAt: "asc" | "desc" } = { createdAt: "desc" };

  if (tag) {
    query = {
      tags: {
        has: tag,
      },
    };
  }

  if (orderBy) {
    if (orderBy === "new") {
      orderByq = {
        createdAt: "desc",
      };
    } else if (orderBy === "oldest") {
      orderByq = {
        createdAt: "asc",
      };
    } else {
      query = {
        ...query,
        answers: {
          none: {},
        },
      };
    }
  } else {
    orderByq = {
      createdAt: "desc",
    };
  }

  const questions = await db.questions.findMany({
    where: query,
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
    orderBy: orderByq,
  });

  if (questions.length === 0) {
    return [];
  }

  return questions;
}
