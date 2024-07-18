"use client"
import AdminSidebar from '../../../components/Admin/Sidebar/AdminSidebar'
import React from 'react'
import Heading from '../../../../app/utils/Heading'
import EditCourse from '../../../components/Admin/Course/EditCourse'
import DashboardHeader from '../../../components/Admin/DashboardHeader'


type Props = {}

const page = ({ params }: any) => {

  const id = params?.id


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

          <EditCourse id={id} />
        </div>

      </div>


    </div>
  )
}

export default page