import { styles } from '@/app/styles/style'
import Image from 'next/image'
import React from 'react'

type Props = {}

const About = (props: Props) => {
    return (
        <div className='text-black dark:text-white'>
            <br />
            <h1 className={`${styles.title} 800px:!text-[45px]`}>
                What is <span className='text-blue-300'>CodeLoom?</span>
            </h1>
            <div className='w-[95%] 800px:w-[85%] m-auto'>
                <p className="text-[18px] font-serif">
                    Are you ready to elevate your programming skills and unlock new opportunities? Welcome to CodeLoom, the ultimate learning hub for aspiring programmers determined to achieve greatness.
                    <br /><br />
                    As the founder and CEO of CodeLoom, I understand the hurdles and uncertainties that come with mastering programming. That’s why I established CodeLoom – to empower you with the right tools, knowledge, and support to not just learn but excel in the tech world.
                    <br /><br />
                    Our YouTube channel is your gateway to a wealth of knowledge, offering videos that cover everything from coding fundamentals to cutting-edge technologies. But the learning doesn’t stop there. Our affordable courses are meticulously crafted to provide a deep and comprehensive education, ensuring you’re fully equipped to thrive in the industry.
                    <br /><br />
                    At CodeLoom, we believe that financial limitations should never stand in the way of your ambitions. That’s why we offer our courses at accessible prices, making high-quality education available to everyone, regardless of their budget.
                    <br /><br />
                    But what truly sets CodeLoom apart is our vibrant and supportive community. Here, you’re not just a learner – you’re part of a family. Whether you’re a beginner taking your first steps or an experienced coder aiming to sharpen your skills, our community is here to support, inspire, and motivate you every step of the way.
                    <br /><br />
                    With CodeLoom as your partner, the path to your dream career becomes clearer and more achievable. Our courses, resources, and community are all designed to help you unlock your potential and become the programmer you’ve always aspired to be.
                    <br /><br />
                    So, why wait? Join the CodeLoom family today and let’s revolutionize the tech world together! With our accessible courses, expert guidance, and unwavering community support, the possibilities are endless.
                </p>
                <br />
                <span className='font-Montserrat'>
                    <a
                        title='font'
                        href="https://www.fontspace.com/category/cursive">
                        <Image
                            src="https://see.fontimg.com/api/rf5/RpEMo/Y2MwYTdhYjA4ZDQ3NGVhZjk4OWMwMDBkZTUzNjIxNDQudHRm/QXNtIE5haGlu/brettley-signature-regular.png?r=fs&h=65&w=1000&fg=000000&bg=FFFFFF&tb=1&s=65"
                            width={150}
                            height={55}
                            alt='sign'
                        />
                    </a>
                </span>
                <h5 className='text-[18px] font-Montserrat'>Founder and CEO</h5>
            </div>
        </div>
    )
}

export default About