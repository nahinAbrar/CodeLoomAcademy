'use client'
import React, { FC, useState } from 'react'
import SidebarProfile from './SidebarProfile';
import { useLogoutQuery } from '@/redux/features/auth/authApi';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import ProfileInfo from './ProfileInfo';

type Props = {
  user: any;
}

const ProfilePage: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const [active, setActive] = useState(1);

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

  return (
    <div className='w-[85%] flex mx-auto'>
      <div className={`w-[60px] 800px:w-[310px] h-[450px] bg-blue-200 dark:bg-slate-900 bg-opacity-90 border border-[#ffffff1d] rounded-[5px] shadow-sm mt-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px]`}>

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

    </div>
  )
}

export default ProfilePage