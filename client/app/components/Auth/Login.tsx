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

const Login: FC<Props> = ({ setRoute }) => {
    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async ({ email, password }) => {
            console.log(email, password);
            //later
        }
    })

    const { errors, touched, values, handleChange, handleSubmit } = formik;

    return (
        <div className='w-full'>
            <h1 className={`${styles.title}`}>
                Login to Educatum
            </h1>

            <form
                onSubmit={handleSubmit}>

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
                    {
                        errors.password && touched.password && (
                            <span className='text-red-500 pt-2 block'>
                                {errors.password}
                            </span>
                        )
                    }

                </div>


                {/*Submit Button*/}
                <div className='w-full mt-5'>
                    <input
                        type="submit"
                        value="Login"
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
                    <FcGoogle size={30} className='cursor-pointer mr-2' />
                    <AiFillGithub size={30} className='cursor-pointer mr-2 dark:text-white' />
                </div>

                <h5 className='text-center pt-4 font-Montserrat text-[14px] dark:text-white'>
                    New to Educatum?{" "}
                    <span className='text-blue-500 dark:text-blue-300 pl-1 cursor-pointer'
                        onClick={() => setRoute("Sign-Up")}>
                        Sign Up
                    </span>
                </h5>

            </form>
        </div>
    )
}

export default Login