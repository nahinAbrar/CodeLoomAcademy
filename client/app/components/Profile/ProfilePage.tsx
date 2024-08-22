'use client'
import React, { FC, useEffect, useState } from 'react'
import SidebarProfile from './SidebarProfile';
import { useLogoutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import CourseCard from '../Course/CourseCard';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';

type Props = {
  user: any;
}

const ProfilePage: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [courses, setCourses] = useState([])

  const [active, setActive] = useState(1);

  const { data, isLoading } = useGetAllCoursesQuery(undefined, {})

  const [logout, setLogout] = useState(false);
  const { } = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
    toast.success("Logged Out Successfully!")
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    })
  }

  useEffect(() => {
    if (data) {
      const filterCourse = user.courses
        .map((userCourse: any) => data.courses
          .find((course: any) => course._id === userCourse._id))
          .filter((course: any) => course !== undefined)

      setCourses(filterCourse)
    }
  }, [data])

  return (
    <div className='w-[85%] flex mx-auto'>
      <div className={`w-[60px] mb-4 800px:w-[310px] h-[450px] bg-blue-200 dark:bg-slate-900 bg-opacity-90 border border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>

        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {
        active === 1 && (
          <div className='w-full h-full bg-transparent mt-[80px]'>
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )
      }
      {
        active === 2 && (
          <div className='w-full h-full bg-transparent mt-[80px]'>
            <ChangePassword />
          </div>
        )
      }
      {
        active === 3 && (
          <div className='w-full h-full bg-transparent mt-[80px]'>
            <div className='w-full pl-7 px-2 800px:px-10 800px:pl-8'>
              <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px]'>
                {courses &&
                  courses.map((item: any, index: number) => (
                    <CourseCard
                      item={item}
                      key={index}
                      isProfile={true}
                    />
                  ))}
              </div>
              {courses.length === 0 && (
                <h1 className='text-center text-black dark:text-white text-[18px] font-Montserrat'>
                  You don&apos;t have any purchased courses!
                </h1>
              )}
            </div>
          </div>
        )
      }

    </div>
  )
}

export default ProfilePage