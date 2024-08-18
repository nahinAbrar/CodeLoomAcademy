"use client"

import CourseDetailPage from "@/app/components/Course/CourseDetailPage"


const Page = ({ params }: any) => {
    return (
        <div>
            <CourseDetailPage id={params.id} />
        </div>
    )
}

export default Page; 