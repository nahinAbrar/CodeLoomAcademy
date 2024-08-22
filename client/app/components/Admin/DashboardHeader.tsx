"use client"
import ThemeSwticher from '@/app/utils/ThemeSwticher'
import { useGetAllNotificationsQuery, useUpdateNotificationStatusMutation } from '@/redux/features/notifications/notificationApi'
import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { IoMdNotificationsOutline } from 'react-icons/io'
import socketIO from "socket.io-client"
import { format } from 'timeago.js'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || ""
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] })

type Props = {
}

const DashboardHeader: FC<Props> = () => {

    const { data, refetch } = useGetAllNotificationsQuery({ refetchOnMountOrArgChange: true })
    const [updateNotificationStatus, { isSuccess, error }] = useUpdateNotificationStatusMutation()

    const [notifications, setNotifications] = useState<any>([])
    const [open, setOpen] = useState(false)

    const [audio] = useState(new Audio("https://res.cloudinary.com/dvrsqx37x/video/upload/v1724239522/notificationAudio/ebjit98mdjypuzytfpx8.wav"))

    const playNotificationSound = () => {
        audio.play()
    }

    useEffect(() => {
        if (data) {
            setNotifications(data.notifications.filter((item: any) => item.status === "unread"))
        }
        if (isSuccess) {
            refetch()
        }
        if(error){
            if("data" in error){
                const erMesg = error.data as any
                toast.error(erMesg.data.message)
            }
        }
        audio.load()
    }, [data, isSuccess])


    useEffect(() => {
        socketId.on("newNotification", (data) => {
            refetch();
            playNotificationSound()
            toast.success("New Notification!!")
        })
    }, [])

    const handleNotificationStatusChange = async (id: string) => {
        await updateNotificationStatus(id)
        toast.success("Marked as Read!")
    }

    return (
        <div className='w-full flex items-center justify-end p-6 fixed top-5 right-0'>
            <ThemeSwticher />

            <div className='relative cursor-pointer m-2' onClick={() => setOpen(!open)}>
                <IoMdNotificationsOutline className='text-2xl cursor-pointer dark:text-white text-black' />
                <span className='absolute -top-2 -right-2 bg-[crimson] dark:bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white'>
                    {notifications && notifications.length}
                </span>
            </div>

            {open && (
                <div className='w-[350px] h-[50vh] dark:bg-[#111C43] bg-gray-300 shadow-xl absolute top-16 z-80 rounded'>
                    <h5 className='text-center text-[20px] font-Montserrat text-black dark:text-white'>
                        Notifications
                    </h5>
                    {notifications && notifications.map((item: any, index: number) => (
                        <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] font-Montserrat border-b dark:border-b-[#ffffff47] border-b-[#0000000f]'>
                            <div className='w-full flex items-center justify-between p-2'>
                                <p className='text-black dark:text-white'>
                                    {item.title}
                                </p>
                                <p className='text-black dark:text-white cursor-pointer'
                                    onClick={() => handleNotificationStatusChange(item._id)}
                                >
                                    Mark as read
                                </p>
                            </div>
                            <p className='px-2 text-black dark:text-white'>
                                {item.message}
                            </p>
                            <p className='p-2 text-black dark:text-white text-[14px]'>
                                {format(item.createdAt)}
                            </p>
                        </div>
                    ))

                    }
                </div>
            )}

        </div>
    )
}

export default DashboardHeader