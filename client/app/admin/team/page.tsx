"use client"
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import AllUsers from '../../components/Admin/User/AllUsers'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title="CodeLoom-ADMIN"
                    description="Admin Panel"
                    keywords="CodeLoom"
                />

                <div className='flex h-screen'>

                    <div className='1500px:w-[16%] w-1/5'>

                        <AdminSidebar />

                    </div>

                    <div className='w-[85%]'>

                        <DashboardHero />

                        <AllUsers isTeam={true} />
                    </div>

                </div>
            </AdminProtected>
        </div>
    )
}

export default page