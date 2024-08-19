"use client"
import CourseContent from '@/app/components/Course/CourseContent'
import Loader from '@/app/components/Loader/Loader'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

type Props = {
    params: any
}

const page = ({ params }: Props) => {
    const id = params.id

    const { isLoading, error, data } = useLoadUserQuery(undefined, {})

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find((item: any) => item._id === id)
            if (!isPurchased) {
                redirect("/")
            }
            if (error) {
                toast.error("Error redirect")
                redirect("/")
            }
        }
    },[data,error])

    return (
        <>
        {isLoading? (
            <Loader />
        ) : (
            <div>
                <CourseContent id={id} />
            </div>
        )

        }
        
        </>
    )
}

export default page