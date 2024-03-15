import { db } from "@/lib/PtismClient";
import getCurrentUser from "./getCurrentUser";

export default async function getSvaesQuestions() {
const currentUser = await getCurrentUser();

if (!currentUser) {
    return [];
}

const questions  = db.questions.findMany({
    where: {
        id: {
            in: [...(currentUser.saves || [])]
        }
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
    orderBy: {
        createdAt: "desc"
    }
})

return questions;
}