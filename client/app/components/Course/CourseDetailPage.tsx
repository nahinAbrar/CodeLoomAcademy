import { useGetCoursesPreviewQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import Header from '../Header';
import Footer from '../Route/Footer';
import CourseDetails from './CourseDetails';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/ordersApi';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

type Props = {
    id: string
}

const CourseDetailPage = ({ id }: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCoursesPreviewQuery(id);
    const { data: stripePublishData } = useGetStripePublishableKeyQuery({})
    const [createPaymentIntent, { data: createPaymentIntentdata }] = useCreatePaymentIntentMutation({})
    const [stripePromise, setStripePromise] = useState<any>(null)
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        if (stripePublishData) {
            const publishableKey = stripePublishData?.publishableKey;

            if (!publishableKey || typeof publishableKey !== 'string') {
                toast.error("Invalid publishable key received");
            }

            setStripePromise(loadStripe(publishableKey))
        }
        if (data) {
            const amount = Math.round(data.course.price * 100)
            createPaymentIntent(amount)
        }
    }, [stripePublishData, data])

    useEffect(() => {
        if (createPaymentIntentdata) {
            setClientSecret(createPaymentIntentdata?.client_secret.toString())
        }

    }, [createPaymentIntentdata])


    return (
        <>
            {isLoading ?
                (<Loader />) :
                (
                    <div>
                        <Heading
                            title={data.course.name + " --Educatum"}
                            description={"Course Description"}
                            keywords={data?.course?.tags}
                        />

                        <Header
                            route={route}
                            setRoute={setRoute}
                            open={open}
                            setOpen={setOpen}
                            activeItem={1}
                        />

                        {
                            stripePromise && (
                                <CourseDetails
                                    data={data.course}
                                    stripePromise={stripePromise}
                                    clientSecret={clientSecret}
                                    setRoute={setRoute}
                                    setOpen={setOpen}
                                />
                            )
                        }

                        <Footer />
                    </div>
                )
            }
        </>
    )
}

export default CourseDetailPage