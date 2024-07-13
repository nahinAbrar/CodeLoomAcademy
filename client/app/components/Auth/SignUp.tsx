"use client"
import React, { FC, useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc"
import { styles } from '../../../app/styles/style';

type Props = {
    setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please Enter your email"),
    password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp = (props: Props) => {
  return (
    <div>SignUp</div>
  )
}

export default SignUp