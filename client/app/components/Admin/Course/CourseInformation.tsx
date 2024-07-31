"use client"
import React, { FC, useEffect, useState } from 'react'
import { styles } from '../../../../app/styles/style'
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
    const [dragging, setDragging] = useState(false);

    const { data } = useGetHeroDataQuery("Categories");

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories)
        }
    }, [data])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1)
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file);
        }
    }

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    }

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e: any) => {

                setCourseInfo({ ...courseInfo, thumbnail: reader.result })

            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className='w-[80%] m-auto mt-24'>
            <form
                onSubmit={handleSubmit}
                className={`${styles.label}`}
            >
                {/*COURSE NAME*/}
                <div>
                    <label className={`${styles.label}`}>
                        Course Name
                    </label>

                    <input
                        type="name"
                        name=""
                        required
                        value={courseInfo.name}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, name: e.target.value })
                        }
                        id='name'
                        placeholder='NextJS Course'
                        className={`${styles.input}`}
                    />
                </div>
                <br />
                {/*COURSE DESCRIPTION*/}
                <div className='my-2'>
                    <label className={`${styles.label}`}>
                        Course Description
                    </label>

                    <textarea
                        name=''
                        cols={30}
                        rows={8}
                        placeholder='Write something amazing :p'
                        className={`${styles.input} !h-min !py-2`}
                        value={courseInfo.description}
                        onChange={(e: any) =>
                            setCourseInfo({ ...courseInfo, description: e.target.value })
                        }
                    />
                </div>

                <br />

                {/*COURSE PRICE WRAPPER*/}
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label className={`${styles.label}`}>
                            Course Price
                        </label>

                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo.price}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, price: e.target.value })
                            }
                            id='price'
                            placeholder='1500'
                            className={`${styles.input}`}
                        />

                    </div>

                    <div className='w-[50%]'>
                        <label className={`${styles.label} w-[50%]`}>
                            Estimated Price (Optional)
                        </label>

                        <input
                            type="number"
                            name=""
                            required
                            value={courseInfo.estimatedPrice}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
                            }
                            id='estimatedPrice'
                            placeholder='2500'
                            className={`${styles.input}`}
                        />

                    </div>
                </div>

                <br />

                {/*COURSE TAG And Category WRAPPER*/}
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label className={`${styles.label}`}>
                            Course Tags
                        </label>

                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.tags}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, tags: e.target.value })
                            }
                            id='tags'
                            placeholder='WebDev, MERN, NextJS'
                            className={`${styles.input}`}
                        />
                    </div>

                    <div className='w-[50%]'>
                        <label className={`${styles.label} w-[50%]`}>
                            Course Category
                        </label>

                        <select aria-label='categorySelector'
                            className={`${styles.input}`}
                            value={courseInfo.category}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, category: e.target.value })
                            }
                        >

                            <option value="">Select Category</option>
                            {categories.map((item: any) => (
                                <option value={item.title} key={item._id}>
                                    {item.title}
                                </option>
                            ))}

                        </select>

                    </div>
                </div>

                <br />

                {/*COURSE LEVEL,URL WRAPPER*/}
                <div className='w-full flex justify-between'>
                    <div className='w-[45%]'>
                        <label className={`${styles.label}`}>
                            Course Level
                        </label>

                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.level}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, level: e.target.value })
                            }
                            id='level'
                            placeholder='Beginner/Intermediate/Expert'
                            className={`${styles.input}`}
                        />

                    </div>

                    <div className='w-[50%]'>
                        <label className={`${styles.label} w-[50%]`}>
                            Demo URL
                        </label>

                        <input
                            type="text"
                            name=""
                            required
                            value={courseInfo.demoUrl}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                            }
                            id='demoUrl'
                            placeholder='https://youtu.be/O8N8pbKQvqU?si=VEz5mDtXXH2qt7bm'
                            className={`${styles.input}`}
                        />

                    </div>
                </div>

                <br />

                {/*THUMBNAIL WRAPPER*/}
                <div className='w-full py-5'>
                    <input
                        aria-label='file'
                        type="file"
                        accept="image/*"
                        id="file"
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-400" : "bg-transparent"}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {
                            courseInfo.thumbnail ? (
                                <img
                                    src={courseInfo.thumbnail}
                                    alt=''
                                    className='max-w-full w-full object-cover'
                                />
                            ) : (
                                <span className='text-black dark:text-white'>
                                    Pro tip: Don't upload your cat (unless it's the thumbnail).
                                </span>
                            )
                        }


                    </label>

                </div>

                <br />

                {/*Button WRAPPER*/}
                <div className='w-full flex items-center justify-end mb-5'>
                    <input
                        type="submit"
                        value="Next"
                        className='w-full 800px:[180px] h-[40px] bg-blue-800 text-center text-[#fff] rounded-xl mt-5 cursor-pointer'
                    />


                </div>
            </form>

        </div>
    )
}

export default CourseInformation