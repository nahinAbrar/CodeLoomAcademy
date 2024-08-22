"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import About from '../components/Pages/About'
import Footer from '../components/Route/Footer'

type Props = {}

const page = (props: Props) => {

    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(2)
    const [route, setRoute] = useState("Login")


    return (
        <div>
            <Heading
                title="About Us - CodeLoom"
                description="At CodeLoom Academy, we empower aspiring coders to master programming skills through expert-led courses, hands-on learning, and a supportive community. Start your journey with us and weave your future in tech."
                keywords="CodeLoom Academy, programming courses, coding education, learn to code, tech skills, software development, coding bootcamp"
            />

            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                route={route}
                setRoute={setRoute}
            />

            <About />

            <Footer />
        </div>
    )
}

export default page