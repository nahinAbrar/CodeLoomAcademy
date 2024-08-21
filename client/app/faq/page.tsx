"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import About from '../components/Pages/About'
import Footer from '../components/Route/Footer'
import Policy from '../components/Pages/Policy'
import Faq from '../components/Route/Faq'

type Props = {}

const page = (props: Props) => {

  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(4)
  const [route, setRoute] = useState("Login")


  return (
    <div className='min-h-screen'>
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

      <Faq />

      <Footer />
    </div>
  )
}

export default page