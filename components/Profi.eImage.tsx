"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@prisma/client";

export default function ProfiEImage({
  currentUser,
  fullname,
  small = false,
  large = false,
}: {
  currentUser: User;
  fullname: string[];
  small?: boolean;
  large?: boolean;
}) {
  return (
    <Avatar className={`${small ? "w-10 h-10" : large ? "w-40 h-40" : ""}`}>
      <AvatarImage src={currentUser.image ?? ""} />
      <AvatarFallback>
        {fullname[0].charAt(0)} {fullname[1].charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
