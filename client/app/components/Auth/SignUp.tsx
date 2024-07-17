"use client"
import React, { FC, useEffect, useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc"
import { styles } from '../../../app/styles/style';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Props = {
    setRoute: (route: string) => void;
}

const schema = Yup.object().shape({
    name: Yup.string().required("Please Enter Your Name"),
    email: Yup.string().email("Invalid email").required("Please Enter your email"),
    password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {

    const [show, setShow] = useState(false);
    const [register, { data, error, isSuccess }] = useRegisterMutation();

    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "Registration Successfull";
            toast.success(message);
            setRoute("Verification");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error])


    const formik = useFormik({
        initialValues: { name: "", email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ name, email, password }) => {
            const data = {
                name, email, password
            }
            await register(data);

        }
    })

    const { errors, touched, values, handleChange, handleSubmit } = formik;
    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Register Your Account!
            </h1>

            <form
                onSubmit={handleSubmit}>

                <div>
                    <label
                        htmlFor="email"
                        className={`${styles.label}`}
                    >
                        Enter Your Name
                    </label>

                    <input
                        type='text'
                        name=''
                        value={values.name}
                        onChange={handleChange}
                        id="name"
                        placeholder='John Doe'
                        className={`${errors.name && touched.name && "border-red-500"} ${styles.input}`}
                    />
                    {
                        errors.name && touched.name && (
                            <span className='text-red-500 pt-2 block'>
                                {errors.name}
                            </span>
                        )
                    }
                </div>


                <label
                    htmlFor="email"
                    className={`${styles.label}`}
                >
                    Enter Your Email
                </label>

                <input
                    type='email'
                    name=''
                    value={values.email}
                    onChange={handleChange}
                    id="email"
                    placeholder='johndoe@gmail.com'
                    className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`}
                />
                {
                    errors.email && touched.email && (
                        <span className='text-red-500 pt-2 block'>
                            {errors.email}
                        </span>
                    )
                }
                <div className='w-full mt-5 relative mb-1'>
                    <label
                        htmlFor="password"
                        className={`${styles.label}`}
                    >
                        Enter Your Password
                    </label>

                    <input
                        type={!show ? "password" : "text"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id="password"
                        placeholder=' '
                        className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`}

                    />
                    {
                        !show ? (
                            <AiOutlineEyeInvisible
                                className='absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white'
                                size={20}
                                onClick={() => setShow(true)}
                            />
                        ) : (
                            <AiOutlineEye
                                className='absolute bottom-3 right-2 z-1 cursor-pointer dark:text-white'
                                size={20}
                                onClick={() => setShow(false)}
                            />

                        )
                    }
                </div>

                {
                    errors.password && touched.password && (
                        <span className='text-red-500 pt-2 block'>
                            {errors.password}
                        </span>
                    )
                }


                {/*Submit Button*/}
                <div className='w-full mt-5'>
                    <input
                        type="submit"
                        value="Join Now!"
                        className={`${styles.button}`}
                    />
                </div>
                <br />

                {/*Social Auth Heading*/}
                <h5 className='text-center pt-4 font-Montserrat text-[14px] text-black dark:text-white'>
                    Or Join With
                </h5>

                {/*Social Auth Icons*/}
                <div className='flex items-center justify-center my-3'>
                    <FcGoogle size={30} className='cursor-pointer mr-2' onClick={() => signIn("google")} />
                    <AiFillGithub size={30} className='cursor-pointer mr-2 dark:text-white' />
                </div>

                <h5 className='text-center pt-4 font-Montserrat text-[14px] dark:text-white'>
                    Already Have an Account?{" "}
                    <span className='text-blue-500 dark:text-blue-300 pl-1 cursor-pointer'
                        onClick={() => setRoute("Login")}>
                        Login
                    </span>
                </h5>

            </form>
        </div>
    )
}

export default SignUp