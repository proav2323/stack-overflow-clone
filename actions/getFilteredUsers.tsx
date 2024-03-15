import { db } from "@/lib/PtismClient";

export default async function getSearchUsers(search: string) {
  let query: any = {}
  if (search) {
    query = {OR: [
            {
                name: {
                    contains: search
                }
            },
            {
                about: {
                    contains: search
                }
            },
            {
                email: {
                    contains: search
                }
            },
        ]}
  } else {
     query = {}
  }

  const questions = await db.user.findMany({
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
