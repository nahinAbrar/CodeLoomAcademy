"use client"
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../hooks/adminProtected'


type Props = {}

const page = (props: Props) => {
    
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="Educatum-ADMIN"
                    description="Admin Panel"
                    keywords="Educatum"
                />

                <div className='flex h-[200vh]'>

                    <div className='1500px:w-[16%] w-1/5'>

                        <AdminSidebar />

                    </div>

                    <div className='w-[85%]'>

                    </div>

                </div>
            </AdminProtected>
        </div>
    )
}

export default page