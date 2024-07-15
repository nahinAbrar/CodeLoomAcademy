import React, { FC } from 'react'
import { styles } from '../../../../app/styles/style'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import toast from 'react-hot-toast';

type Props = {
    benefits: { title: string }[];
    setBenefits: (benefits: { title: string }[]) => void;
    prerequisites: { title: string }[];
    setPrerequisites: (prerequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData: FC<Props> = ({ benefits, setBenefits, prerequisites, setPrerequisites, active, setActive }) => {

    const handleBenefitChange = (index: number, value: any) => {
        const updatedBenefits = [...benefits];
        updatedBenefits[index].title = value;
        setBenefits(updatedBenefits)
    }

    const handleAddBenefits = () => {
        setBenefits([...benefits, { title: "" }])
    }

    const handlePrerequisitesChange = (index: number, value: any) => {
        const updatedPrerequisites = [...prerequisites];
        updatedPrerequisites[index].title = value;
        setPrerequisites(updatedPrerequisites)
    }

    const handlePrerequisites = () => {
        setPrerequisites([...prerequisites, { title: "" }])
    }

    const prevButton = () => {
        setActive(active - 1);
    }

    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && prerequisites[prerequisites.length - 1]?.title !== "") {
            setActive(active + 1);
        }
        else {
            toast.error("Please fill the fields to go to next");
        }
    }

    return (
        <div className='w-[80%] m-auto mt-24 block'>
            {/*BENEFITS WRAPPER*/}
            <div>
                <label
                    htmlFor="benefits"
                    className={`${styles.label} text-[20px] font-bold`}
                >
                    What are the benefits for students in this course?
                </label>
                <br />
                {
                    benefits.map((benefits: any, index: number) => (
                        <input
                            type='text'
                            key={index}
                            name='Benefit'
                            placeholder='This course is your ticket to landing your dream job.'
                            required
                            className={`${styles.input} my-2`}
                            value={benefits.title}
                            onChange={(e) => handleBenefitChange(index, e.target.value)}
                        />

                    ))
                }

                <AddCircleIcon
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handleAddBenefits}
                    className='text-black dark:text-white'
                />
            </div>

            {/*Prerequisites WRAPPER*/}
            <div className='my-2'>
                <label
                    htmlFor="benefits"
                    className={`${styles.label} text-[20px] font-bold`}
                >
                    What are the Prerequisites for students in this course?
                </label>
                <br />
                {
                    prerequisites.map((prerequisites: any, index: number) => (
                        <input
                            type='text'
                            key={index}
                            name='Prerequisite'
                            placeholder='No need to be a WebDev master, but a little foundation goes a long way!'
                            required
                            className={`${styles.input} my-2`}
                            value={prerequisites.title}
                            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
                        />

                    ))
                }

                <AddCircleIcon
                    style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
                    onClick={handlePrerequisites}
                    className='text-black dark:text-white'
                />
            </div>


            {/*Button WRAPPER*/}
            <div className='w-full flex items-center justify-between mb-5 gap-10'>

                <div
                    className='w-full 800px:[180px] h-[40px] bg-blue-700 flex justify-center items-center text-center text-[#fff] rounded-xl mt-5 cursor-pointer'
                    onClick={() => prevButton()}
                >
                    Previous
                </div>


                <div
                    className='w-full 800px:[180px] h-[40px] bg-blue-700 flex justify-center items-center text-center text-[#fff] rounded-xl mt-5 cursor-pointer'
                    onClick={() => handleOptions()}
                >
                    Next
                </div>


            </div>
        </div>
    )
}

export default CourseData