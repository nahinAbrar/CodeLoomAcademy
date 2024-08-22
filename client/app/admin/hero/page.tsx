"use client"
import React from 'react'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import Heading from '@/app/utils/Heading'
import Sidebar from '@/app/components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/adminProtected'
import EditHero from '@/app/components/Admin/Customization/EditHero'
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


                <div className='flex max-h-screen'>
                    <div className='1500px:w-[16%] w-1/5'>
                        <Sidebar />
                    </div>

                    <div className='w-[85%]'>
                        <DashboardHero />
                        <EditHero />
                    </div>
                </div>



            </AdminProtected>
        </div>
    )
}

export default page