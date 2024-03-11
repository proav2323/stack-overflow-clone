import getAllQuestio from "@/actions/getAllQuestions";
import getCurrentUser from "@/actions/getCurrentUser";
import { ModeToggle } from "@/components/ModeToggle";
import Questions from "@/components/Questions";
import Sorter from "@/components/Sorter";
import { questionsWithReplies } from "@/types";
import Image from "next/image";

export default async function Home({searchParams}: {searchParams: {tag: string, orderBy: "new" | "old" | "unanswered"}}) {
  const questions: questionsWithReplies[] = await getAllQuestio();
  const currentUser = await getCurrentUser();
  return (
      <div className="flex flex-col w-full mt-2 gap-2">
        <Sorter />
        <Questions url="/" currentUser={currentUser} questions={questions} showButton={false} title="no questiosn found" sub="try agian in some time" />
      </div>
  );
}