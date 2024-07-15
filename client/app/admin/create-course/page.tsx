"use client"
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import React from 'react'
import Heading from '../../../app/utils/Heading'
import CreateCourse from '../../components/Admin/Course/CreateCourse'
import DashboardHeader from '../../components/Admin/DashboardHeader'



type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <Heading
                title="Educatum-ADMIN"
                description="Admin Panel"
                keywords="Educatum"
            />

            <div className='flex'>

                <div className='1500px:w-[16%] w-1/5'>
                    <AdminSidebar />
                </div>

                <div className='w-[85%]'>
                    <DashboardHeader />

                    <CreateCourse />
                </div>

            </div>


        </div>
    )
}

export default page