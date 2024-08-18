"use client"
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import Faq from "./components/Route/Faq";

interface Props { }

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");


  return (
    <div>
      <Heading 
      title="Educatum Academy"
      description="Bla Bla"
      keywords="VARSITY,"
      />

      <Header
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      setRoute ={setRoute}
      route = {route}
      />

      <Hero />
      <Courses />
      <Reviews />
      <Faq />

    </div>
  )
};


export default Page;
