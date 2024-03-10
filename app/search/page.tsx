import getCurrentUser from '@/actions/getCurrentUser';
import getSearchQuestions from '@/actions/getSearchQuestions';
import Questions from '@/components/Questions';
import { questionsWithReplies } from '@/types';
import React from 'react'

export default async function page({searchParams}: {searchParams: {search: string}}) {
  const questions: questionsWithReplies[] = await getSearchQuestions(searchParams.search ? searchParams.search : "");
  const currentUser = await getCurrentUser();
  return (
      <div className="flex flex-col w-full mt-2">
        <Questions url="/search" currentUser={currentUser} questions={questions} showButton={true} title="no questions found" sub="try searching somethign else" hTitle={`searched prodsucts`} />
      </div>
  );
}
