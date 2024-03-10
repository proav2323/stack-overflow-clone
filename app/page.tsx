import getAllQuestio from "@/actions/getAllQuestions";
import getCurrentUser from "@/actions/getCurrentUser";
import { ModeToggle } from "@/components/ModeToggle";
import Questions from "@/components/Questions";
import { questionsWithReplies } from "@/types";
import Image from "next/image";

export default async function Home() {
  const questions: questionsWithReplies[] = await getAllQuestio();
  const currentUser = await getCurrentUser();
  return (
      <div className="flex flex-col w-full mt-2">
        <Questions url="/" currentUser={currentUser} questions={questions} showButton={false} title="no questiosn found" sub="try agian in some time" />
      </div>
  );
}