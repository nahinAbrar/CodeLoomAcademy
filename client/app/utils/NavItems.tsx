import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export const navItemsData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Courses",
        url: "/courses",
    },
    {
        name: "About",
        url: "/about",
    },
    {
        name: "Policy",
        url: "/policy",
    },
    {
        name: "FAQ",
        url: "/faq",
    },
];

type Props = {
    activeItem: number,
    isMobile: boolean,
}

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className='hidden 800px:flex'>
                {
                    navItemsData && navItemsData.map((i, index) => (
                        <Link
                            href={`${i.url}`}
                            key={index}
                            passHref>
                            <span
                                className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]"
                                    : "dark:text-white text-black"} text-[18px] px-6 font-Montserrat font-[400]`}>

                                {i.name}
                            </span>
                        </Link>
                    ))
                }
            </div>

            {/*Mobile Nav*/}
            {
                isMobile && (
                    <div className='800px:hidden mt-5'>

                        {/* LOGO */}
                        <div className='w-full text-left py-6 mb-10 px-6'>
                            <Link
                                href="/"
                                passHref
                            >
                                <span className={`text-black dark:text-white`}>
                                    <a
                                        title='font'
                                        href="https://www.fontspace.com/category/cursive">
                                        <Image src="https://see.fontimg.com/api/rf5/PKY87/MmRmZGRhNTQ4YjFmNDk5MTliMjk2NWNiMjYwYTFlOGYudHRm/Q29kZUxvb20gQWNhZGVteQ/emotional-rescue-personal-use-regular.png?r=fs&h=28&w=1000&fg=000000&bg=FFFFFF&tb=1&s=28"
                                            alt="Cursive fonts"
                                            width={100}
                                            height={80}
                                        />
                                    </a>
                                </span>

                            </Link>
                        </div>


                        {navItemsData &&
                            navItemsData.map((i, index) => (
                                <Link
                                    href="/"
                                    passHref
                                    key={index}>
                                    <span className={`${activeItem === index ?
                                        "dark:text-[#37a39a] text-[crimson]" :
                                        "dark:text-white text-black"}
                                        block text-[18px] px-6 font-Montserrat font-[400]`} >
                                        {i.name}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default NavItems