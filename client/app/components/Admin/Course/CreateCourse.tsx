"use client"
import React, { useEffect, useState } from 'react'
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi'; //need to change if not works
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

type Props = {}

const CreateCourse = (props: Props) => {
    const [createCourse, { isLoading, isSuccess, error }] = useCreateCourseMutation();
    const [active, setActive] = useState(0);


    useEffect(() => {
        if (isSuccess) {
            toast.success("Course Created Successfully");
            redirect("/admin/courses")
        }
        if (error) {
            if ("data" in error) {
                const errorMesg = error as any;

                toast.error(errorMesg.data.message);
            }
        }

    }, [isSuccess, isLoading, error])


    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        categories: "",
        demoUrl: "",
        thumbnail: "",
    })


    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                }
            ],
            suggestion: "",
        },
    ])

    const [courseData, setCourseData] = useState({})

    

    const handleSubmit = async () => {
        // format everything
        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
        const fotmattedPrerequisites = prerequisites.map((prerequisite) => ({ title: prerequisite.title }))

        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videolength: courseContent.videoLength,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: courseContent.suggestion,

        }))

        // prepare data object
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            categories: courseInfo.categories,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: fotmattedPrerequisites,
            courseData: formattedCourseContentData,
        }


        setCourseData(data);
    }

    const handleCourseCreate = async (e: any) => {
        const data = courseData;

        if(!isLoading){
            await createCourse(data);
        }
    }

    return (
        <div className='w-full flex min-h-screen'>

            <div className='w-[80%]'>

                {active === 0 &&
                    (<CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />

                    )
                }

                {active === 1 &&
                    (<CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />

                    )
                }

                {active === 2 &&
                    (<CourseContent
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />

                    )
                }

                {active === 3 &&
                    (<CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
                        isEdit={false}
                    />

                    )
                }

            </div>


            <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
                <CourseOptions active={active} setActive={setActive} />
            </div>


        </div>
    )
}

export default CreateCourse