import { User, answers, comment, questions, reply } from "@prisma/client";

export type questionsWithReplies = Omit<
  questions,
  "answers" | "askedBy" | "comment"
> & {
  answers: answersWithA[];
  askedBy: User;
  comment: commentWithA[];
};

export type answersWithA = Omit<answers, "replies" | "answeredBy"> & {
  replies: RepliesWithA[];
  answeredBy: User;
};

export type RepliesWithA = Omit<reply, "replyedBy"> & {
  replyedBy: User;
};

export type commentWithA = Omit<comment, "commentBy"> & {
  commentBy: User;
};

export type userWithT = Omit<User, "answers" | "comment"> & {
  answers: answersWithA[];
  comment: commentWithA[];
};
