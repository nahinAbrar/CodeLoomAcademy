"use client"
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import ProfilePage from '../components/Profile/ProfilePage'
import { useSelector } from 'react-redux'

type Props = {

}

const Profile: FC<Props> = (props) => {

    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(5);
    const [route, setRoute] = useState("Login");
    const {user} = useSelector((state:any) => state.auth);
    return (
        <div>
            <Protected>
                <Heading
                    title={`${user?.name} 's Profile -Educatum`}
                    description="Bla Bla"
                    keywords="VARSITY,"
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
            </Protected>
        </div>
    )
}

export default Profile