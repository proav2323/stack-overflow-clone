import getAllQuestio from "@/actions/getAllQuestions";
import getCurrentUser from "@/actions/getCurrentUser";
import getSortedQuestions from "@/actions/getSortedItems";
import { ModeToggle } from "@/components/ModeToggle";
import Questions from "@/components/Questions";
import Sorter from "@/components/Sorter";
import { questionsWithReplies } from "@/types";
import Image from "next/image";

export default async function Home({searchParams}: {searchParams: {tag: string, orderBy: "new" | "oldest" | "unanswered"}}) {
  const questions: questionsWithReplies[] = await getSortedQuestions(searchParams);
  const currentUser = await getCurrentUser();
  return (
      <div className="flex flex-col w-full mt-2 gap-2">
        {questions.length >= 1 && (<Sorter  url="/questions"/>)}
        <Questions url="/" currentUser={currentUser} questions={questions} showButton={false} title="no questiosn found" sub="try agian in some time" />
      </div>
  );
}