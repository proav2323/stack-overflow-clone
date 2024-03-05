"use client"

import React from 'react'
import LoginModel from '../models/LoginModel'
import RegisterModel from '../models/RegisterModel'

export default function ModelProvider() {
  return (
    <>
     <LoginModel />
     <RegisterModel />
    </>
  )
}
