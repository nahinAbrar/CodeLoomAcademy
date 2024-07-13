import React, { FC } from 'react'
import Link from "next/link"
import Image from "next/image"
import { BiSearch } from 'react-icons/bi'

type Props = {}

const Hero: FC<Props> = (props) => {
    return (
        <div className='w-full 1000px:flex items-center'>
            <div className='absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[40vh] left-5 w-[40vh] hero_animation rounded-[50%] 1100px:left-8 1500px:left-14' />

            {/*LEFT*/}
            <div className='1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10'>
                <Image
                    src={require("../../../public/assets/three.jpg")}
                    alt='hero-1'
                    width={400}
                    height={400}
                    className='rounded-xl'
                />
            </div>


            {/*RIGHT*/}
            <div className='1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]'>

                <h2 className='dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[60%] 1100px:w-[78%]'>
                    Learn In The Smartest Way
                </h2>

                <br />

                <p className='dark:text-[#edfff4] px-3 text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]'>
                    Where Knowledge Meets Innovation
                </p>

                <br />
                <br />

                {/*Searchbar*/}
                <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative'>
                    <input
                        placeholder="Search Courses..."
                        className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
                        type="search"
                        value="">
                    </input>

                    {/* SVG */}
                    <div className='absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-blue-300 rounded-r-[5px]'>
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            className="text-white"
                            height="30" width="30"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                        </svg>
                    </div>
                </div>
                <br /><br />
                {/*Text and view course*/}
                <div className='1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center ml-8'>
                    <Image
                        src={require("../../../public/assets/client-1.png")}
                        alt='client-1'
                        width={46}
                        height={46}
                        className='rounded-full ml-[-20px]'
                    />

                    <Image
                        src={require("../../../public/assets/client-2.png")}
                        alt='client-1'
                        width={46}
                        height={46}
                        className='rounded-full ml-[-20px]'
                    />

                    <Image
                        src={require("../../../public/assets/client-3.png")}
                        alt='client-1'
                        width={46}
                        height={46}
                        className='rounded-full ml-[-20px]'
                    />

                    <p className='font-Montserrat dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]'>
                        50K+ People already trusted us. 
                    </p>

                    <Link
                    href="/courses"
                    passHref
                    className='ml-1 dark:text-[#46e256] text-[crimson] font-Montserrat font-bold'
                    >
                    View Courses
                    </Link>
                </div>

            </div>




        </div>
    )
}

export default Hero