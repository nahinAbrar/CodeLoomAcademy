"use client"
import React from 'react'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import Heading from '@/app/utils/Heading'
import Sidebar from '@/app/components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '@/app/hooks/adminProtected'
import AllInvoices from '@/app/components/Admin/Order/AllInvoices'
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


                <div className='flex max-h-screen'>
                    <div className='1500px:w-[16%] w-1/5'>
                        <Sidebar />
                    </div>

                    <div className='w-[85%]'>
                        <DashboardHero />
                        <AllInvoices />
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default page