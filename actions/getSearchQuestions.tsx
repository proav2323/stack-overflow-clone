import { db } from "@/lib/PtismClient";

export default async function getSearchQuestions(search: string, orderBy: "new" | "oldest" | "unanswered") {
  let orderByq: { createdAt: "asc" | "desc" } = { createdAt: "desc" };
  let query: any = {OR: [
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
        ]}

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
    orderBy: {
      createdAt: "desc"
    }
  });

  if (questions.length === 0) {
    return [];
  }

  return questions;
}
