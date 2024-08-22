"use client"
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import Faq from "./components/Route/Faq";
import Footer from "./components/Route/Footer";

interface Props { }

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");


  return (
    <div>
      <Heading 
      title="CodeLoom Academy"
      description="At CodeLoom Academy, we empower aspiring coders to master programming skills through expert-led courses, hands-on learning, and a supportive community. Start your journey with us and weave your future in tech."
      keywords="CodeLoom Academy, programming courses, coding education, learn to code, tech skills, software development, coding bootcamp"
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
      <Footer />

    </div>
  )
};


export default Page;
