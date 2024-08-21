"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import About from '../components/Pages/About'
import Footer from '../components/Route/Footer'
import Policy from '../components/Pages/Policy'

type Props = {}

const page = (props: Props) => {

    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(3)
    const [route, setRoute] = useState("Login")


    return (
        <div>
            <Heading
                title="Policy - Educatum"
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

            <Policy />

            <Footer />
        </div>
    )
}

export default page