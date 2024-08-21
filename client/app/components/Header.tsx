"use client";
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react'
import NavItems from '../utils/NavItems';
import ThemeSwticher from '../utils/ThemeSwticher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import CustomModal from '../utils/CustomModal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Verification from './Auth/Verification';
import Image from 'next/image';
import avatar from "../../public/assets/avatar.png"
import { useSession } from 'next-auth/react';
import { useLogoutQuery, useSocialAuthMutation } from '@/redux/features/auth/authApi';
import { socialAuth } from '../../../server/controllers/user.controller';
import toast from 'react-hot-toast';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {

    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {})
    const { data } = useSession();
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation()

    const [logout, setLogout] = useState(false);
    const { } = useLogoutQuery(undefined, {
        skip: !logout ? true : false,
    });

    useEffect(() => {
        if (!isLoading) {
            if (!userData) {

                if (data) {
                    socialAuth({ email: data?.user?.email, name: data?.user?.name, avatar: data.user?.image });
                }
                refetch()
            }
        }
        if (data === null) {
            if (isSuccess) {
                toast.success("Logged in Successfully!")
            }
        }
        if (data === null && !isLoading && !userData) {
            setLogout(true);

        }

    }, [data, userData, isLoading])


    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                setActive(true);
            } else {
                setActive(false);
            }
        })
    }

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            setOpenSidebar(false);
        }
    }

    return (
        <div className='w-full relative'>
            <div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 backdrop-blur-lg inset-x-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[90] dark:shadow"}`}>


                <div className='w-[95%] 800px:w-[92%] m-auto py-2 h-full'>
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link
                                href={"/"}
                                className={`text-[25px] font-Montserrat font-500 text-black dark:text-white`}
                            >
                                Educatum
                            </Link>
                        </div>
                        <div className='flex items-center'>
                            {/*NavItems*/}
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false}
                            />

                            <ThemeSwticher />
                            {/*For Mobile*/}
                            <div className='800px:hidden'>
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className='cursor-pointer dark:text-white text-black'
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>

                            {
                                userData ? (
                                    <Link href={"/profile"}>
                                        <Image
                                            src={userData?.user.avatar ? userData?.user.avatar.url : avatar}
                                            alt="userImage"
                                            width={30}
                                            height={30}
                                            className='w-[30px] h-[30px] rounded-full'
                                            style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                                        />

                                    </Link>

                                ) : (
                                    <HiOutlineUserCircle
                                        size={25}
                                        className='hidden 800px:block cursor-pointer dark:text-white text-black'
                                        onClick={() => setOpen(true)}
                                    />

                                )
                            }
                        </div>

                    </div>
                </div>

                {/*Mobile side bar*/}
                {
                    openSidebar && (
                        <div
                            className='fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000024]'
                            onClick={handleClose}
                            id='screen'
                        >

                            <div className='w-[70%] fixed z-[9999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 flex flex-col justify-center text-left gap-10'>
                                <NavItems
                                    activeItem={activeItem}
                                    isMobile={true}
                                />

                                {
                                    userData ? (
                                        <Link href={"/profile"}>
                                            <Image
                                                src={userData?.user.avatar ? userData?.user.avatar.url : avatar}
                                                alt="userImage"
                                                width={30}
                                                height={30}
                                                className='w-[30px] ml-[20px] h-[30px] rounded-full'
                                                style={{ border: activeItem === 5 ? "2px solid #37a39a" : "none" }}
                                            />

                                        </Link>

                                    ) : (
                                        <HiOutlineUserCircle
                                            size={25}
                                            className='hidden 800px:block cursor-pointer dark:text-white text-black'
                                            onClick={() => setOpen(true)}
                                        />

                                    )
                                }
                                <br />
                                <br />
                                <p className='text-[16px] px-2 pl-5 text-black dark:text-white font-Montserrat'>
                                    Copyright © 2024 Educatum Academy
                                </p>

                            </div>
                        </div>

                    )
                }


            </div>
            {
                route === "Login" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Login}
                                    refetch={refetch}
                                />
                            )
                        }
                    </>
                )

            }
            {
                route === "Sign-Up" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={SignUp}
                                />
                            )
                        }
                    </>
                )
            }

            {
                route === "Verification" && (
                    <>
                        {
                            open && (
                                <CustomModal
                                    open={open}
                                    setOpen={setOpen}
                                    setRoute={setRoute}
                                    activeItem={activeItem}
                                    component={Verification}
                                />
                            )
                        }
                    </>
                )
            }

        </div>
    )
}

export default Header