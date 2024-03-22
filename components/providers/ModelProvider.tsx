"use client";

import React from "react";
import LoginModel from "../models/LoginModel";
import RegisterModel from "../models/RegisterModel";
import AddQuestionModel from "../models/AddQuestionModel";
import EditQuestionModel from "../models/EditQuestions";
import EditProfileModel from "../models/EditProfileModel";

export default function ModelProvider() {
  return (
    <>
      <AddQuestionModel />
      <LoginModel />
      <RegisterModel />
      <EditQuestionModel />
      <EditProfileModel />
    </>
  );
}
