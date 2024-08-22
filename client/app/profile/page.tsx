"use client"
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import ProfilePage from '../components/Profile/ProfilePage'
import { useSelector } from 'react-redux'
import Footer from '../components/Route/Footer'

type Props = {

}

const Profile: FC<Props> = (props) => {

    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const { user } = useSelector((state: any) => state.auth);
    return (
        <div className='min-h-screen'>
            <Protected>
                <Heading
                    title={`${user?.name} 's Profile -CodeLoom`}
                    description="At CodeLoom Academy, we empower aspiring coders to master programming skills through expert-led courses, hands-on learning, and a supportive community. Start your journey with us and weave your future in tech."
                    keywords="CodeLoom Academy, programming courses, coding education, learn to code, tech skills, software development, coding bootcamp"
                />

                <Header
                    open={open}
                    setOpen={setOpen}
                    activeItem={activeItem}
                    setRoute={setRoute}
                    route={route}
                />

                <ProfilePage
                    user={user}
                />

                <Footer />
            </Protected>
        </div>
    )
}

export default Profile