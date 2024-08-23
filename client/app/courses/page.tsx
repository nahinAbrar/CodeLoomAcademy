'use client'
import { useGetUserAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import { styles } from '../styles/style'
import CourseCard from '../components/Course/CourseCard'
import Footer from '../components/Route/Footer'

type Props = {}

const Page = (props: Props) => {
    const searchParams = useSearchParams()
    const search = searchParams?.get('title')

    const [route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)
    const [courses, setCourses] = useState([])
    const [category, setCategory] = useState("All")


    const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {})
    const { data: categoriesData } = useGetHeroDataQuery("Categories", {})


    useEffect(() => {
        if (category === "All") {
            setCourses(data?.courses)
        }
        if (category !== "All") {
            setCourses(data?.courses.filter((item: any) => item.categories === category))
        }
        if (search) {
            setCourses(data?.courses.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())))
        }

    }, [data, category, search])


    const categories = categoriesData?.layout.categories

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header
                        route={route}
                        setRoute={setRoute}
                        open={open}
                        setOpen={setOpen}
                        activeItem={1}
                    />

                    <div className='w-[95%] 800px:w-[85%] m-auto min-h-[70vh]'>
                        <Heading
                            title={"All Courses - CodeLoom"}
                            description={"Bla Bla"}
                            keywords={"Programming"}
                        />
                        <br />

                        <div className='w-full flex items-center flex-wrap text-white'>
                            <div
                                className={`h-[35px] ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Montserrat cursor-pointer`}
                                onClick={() => setCategory("All")}
                            >
                                All
                            </div>
                            {categories && categories.map((item: any, index: number) => (
                                <div
                                    key={index}
                                >
                                    <div
                                        className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"} m-3 px-3 rounded-[30px] flex items-center justify-center font-Montserrat cursor-pointer`}
                                        onClick={() => setCategory(item.title)}
                                    >
                                        {item.title}
                                    </div>

                                </div>
                            ))}
                        </div>
                        {
                            courses && courses.length === 0 && (
                                <p className={`${styles.label} font-[25px] justify-center min-h-[50vh] flex items-center font-serif`}>
                                    {search ? "No Courses Found" : "No Courses in this category yet!"}
                                </p>
                            )
                        }
                        <br />
                        <br />
                        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols- 1500px:gap-[35px] mb-12 border-0'>
                            {courses &&
                                courses.map((item: any, index: number) => (
                                    <CourseCard
                                        item={item}
                                        key={index}
                                    />

                                ))
                            }
                        </div>
                    </div>

                    <Footer />

                </>
            )

            }
        </div>
    )
}

export default Page