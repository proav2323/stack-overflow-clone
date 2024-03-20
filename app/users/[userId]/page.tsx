import getCurrentUser from "@/actions/getCurrentUser";
import getUserById from "@/actions/getUserWithId";
import User from "@/components/User";
import { userWithT } from "@/types";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { userId: string } }) {
  const user: userWithT | null = await getUserById(params.userId);
  const currentUser = await getCurrentUser();

  if (!user) {
    return redirect("/");
  }
  return (
    <div className='flex flex-col w-full mt-2'>
      <User user={user} currentUser={currentUser} />
    </div>
  );
}
