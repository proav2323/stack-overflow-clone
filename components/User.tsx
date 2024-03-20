"use client";

import { userWithT } from "@/types";
import React from "react";
import ProfiEImage from "./Profi.eImage";
import { User } from "@prisma/client";
import { Button } from "./ui/button";
import { useModal } from "@/hooks/useModel";
import Questions from "./Questions";

export default function User({
  user,
  currentUser,
}: {
  user: userWithT;
  currentUser: User | null;
}) {
  const fullname = user.name.split(" ");
  const { onOpen } = useModal();
  return (
    <div className='flex flex-col w-full mt-2 gap-2 items-start justify-start px-2'>
      <div className='flex flex-col md:flex-row justify-between items-center w-full px-2 py-2'>
        <div className='flex flex-row gap-2 justify-center items-center'>
          <ProfiEImage fullname={fullname} currentUser={user} large />
          <span className='text-bold font-bold'>{user.name}</span>
        </div>

        <div className='flex flex-row gap-2 items-center justify-start'>
          <span className='text-sm dark:text-neutral-500 text-neutral-300'>
            {user.questions.length} questions
          </span>
          <span className='text-sm dark:text-neutral-500 text-neutral-300'>
            {user.answers.length} answers
          </span>
          {currentUser && currentUser.id === user.id && (
            <Button
              onClick={() => onOpen("updateUser", { currentUser: currentUser })}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      {user.about && (
        <span className='text-base dark:text-neutral-600 text-neutral-300 font-semibold'>
          {user.about}
        </span>
      )}

      <Questions
        questions={user.questions}
        currentUser={currentUser}
        url={`/users/${user.id}`}
        hTitle="User's Questions"
      />
    </div>
  );
}
