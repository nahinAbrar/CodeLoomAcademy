import React from 'react'
import {
    AreaChart,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    Area,
    YAxis
} from "recharts";
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/style';
import { useGetUserAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';

type Props = {
    isDashboard?: boolean;
}

//static data for testing
{/*
const analyticsData = [
    { name: 'January 2023', count: 400 },
    { name: 'February 2023', count: 500 },
    { name: 'March 2023', count: 2000 },
    { name: 'April 2023', count: 100 },
    { name: 'May 2023', count: 3500 },
    { name: 'June 2023', count: 4500 },
    { name: 'July 2023', count: 3200 },
    { name: 'August 2023', count: 2100 },
    { name: 'September 2023', count: 450 },
    { name: 'October 2023', count: 800 },
    { name: 'November 2023', count: 900 },
    { name: 'December 2023', count: 250 }
];

 */}

const UserAnalytics = ({ isDashboard }: Props) => {

    const { data, isLoading } = useGetUserAnalyticsQuery({});

    const analyticsData: any = [];

    data && data.users.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, count: item.count })
    })

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className={`${!isDashboard ? "mt-[50px]" : "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"}`}>
                    <div className={`${isDashboard ? "!ml-8 mb-5" : ''}`}>
                        <h1 className={`${styles.title} ${isDashboard && '!text-[20px]'} px-5 !text-start`}>
                            User Analytics
                        </h1>
                        {
                            !isDashboard && (
                                <p className={`${styles.label} px-5`}>
                                    Last 12 Months Analytics Data{" "}
                                </p>
                            )
                        }
                    </div>

                    <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center`}>
                        <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={isDashboard ? '50%' : '100%'} >
                            <AreaChart
                                data={analyticsData}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 0
                                }}
                            >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#4d62d9"
                                    fill="#4d62d9"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

        </>
    )
}

export default UserAnalytics