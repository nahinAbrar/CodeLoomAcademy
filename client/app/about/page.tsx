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
                title="About Us - Educatum"
                description="bla"
                keywords='programming'
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