"use client"

import React from 'react'
import LoginModel from '../models/LoginModel'
import RegisterModel from '../models/RegisterModel'
import AddQuestionModel from '../models/AddQuestionModel'

export default function ModelProvider() {
  return (
    <>
    <AddQuestionModel />
     <LoginModel />
     <RegisterModel />
    </>
  )
}
