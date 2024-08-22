"use client"
import React, { FC, useEffect, useState } from 'react'
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import { Description } from '@mui/icons-material';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation, useEditCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'; //need to change if not works
import toast from 'react-hot-toast';
import { editCourse } from '../../../../../server/controllers/course.controller';
import { redirect } from 'next/navigation';

type Props = {
    id: string
}

const EditCourse: FC<Props> = ({ id }) => {


    const [editCourse, { isSuccess: editSuccess, error: editError }] = useEditCourseMutation();
    const [active, setActive] = useState(0);
    const { data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const editData = data && data.courses.find((i: any) => i._id === id);


    useEffect(() => {
        if (editSuccess) {
            toast.success("Couse Updated Successfullly!");
            redirect("/admin/courses")
        }
        if (editError) {
            if ("data" in editError) {
                const errorMessage = editError as any;
                toast.error(errorMessage.data.message);
            }
        }

        if (editData) {
            setCourseInfo({
                name: editData.name,
                description: editData.description,
                price: editData.price,
                estimatedPrice: editData?.estimatedPrice,
                categories: editData.categories,
                tags: editData.tags,
                level: editData.level,
                demoUrl: editData.demoUrl,
                thumbnail: editData?.thumbnail?.url,
            })
            setBenefits(editData.benefits);
            setPrerequisites(editData.prerequisites);
            setCourseContentData(editData.courseData);

            toast.success("Course Data Fetch Successfull!")
        }
    }, [editData, editError, editSuccess])


    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        categories: "",
        level: "",
        demoUrl: "",
        thumbnail: [
            {
                public_id: "",
                url: "",
            }
        ],
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
        console.log(data)
    }

    console.log(courseData)

    const handleCourseCreate = async (e: any) => {
        const data = courseData;

        await editCourse({ id: editData?._id, data });

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
                        isEdit={true}
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

export default EditCourse