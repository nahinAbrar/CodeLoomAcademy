import React, { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { styles } from '../../../../app/styles/style'
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import toast from 'react-hot-toast';

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
}

const CourseContent: FC<Props> = ({
    courseContentData,
    setCourseContentData,
    active,
    setActive,
    handleSubmit: handleCourseSubmit }) => {

    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
    );

    const [activeSection, setActiveSection] = useState(1);

    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    }

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    }

    const handleAddLink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    }

    const newContentHandler = (item: any) => {
        if (item.title === "" || item.description === "" || item.videoUrl === "" || item.links[0].title === "" || item.links[0].url === "") {
            toast.error("Please Complete All the Fields First")
        } else {
            let newVideoSection = "";

            if (courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection;

                // use the last video section if available else use user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [
                    {
                        title: "",
                        url: "",
                    }
                ],
            }

            setCourseContentData([...courseContentData, newContent]);


        }
    }

    const addNewSection = () => {
        if (courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === ""
        ) {
            toast.error("Please Complete All the Fields First")
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                links: [
                    {
                        title: "",
                        url: "",
                    }
                ],
            }

            setCourseContentData([...courseContentData, newContent]);
        }
    }

    const prevButton = () => {
        setActive(active - 1);
    }

    const handleOptions = () => {
        if (courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].videoUrl === "" ||
            courseContentData[courseContentData.length - 1].links[0].title === "" ||
            courseContentData[courseContentData.length - 1].links[0].url === "") {

            toast.error("Section Cannot Be Empty");

        }
        else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    }

    return (
        <div className='w-[80%] m-auto mt-24 p-3'>
            <form onSubmit={handleSubmit}>

                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection;
                    return (
                        <>
                            <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>
                                {
                                    showSectionInput && (
                                        <>

                                            <div className='flex w-full items-center'>
                                                <input
                                                    aria-label='Untitlted Section'
                                                    type="text"
                                                    className={`text-[20px] ${item.videoSection === "Untitlted Section" ? "w-[170px]" : "w-min"} font-Montserrat cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                    value={item.videoSection}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].videoSection = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}

                                                />

                                                <BsPencil className='cursor-pointer dark:text-white text-black' />

                                            </div>
                                            <br />
                                        </>
                                    )
                                }
                                <div className='flex w-full items-center justify-between my-0'>
                                    {
                                        isCollapsed[index] ? (
                                            <>
                                                {item.title} ? (
                                                <p className='font-Montserrat dark:text-white text-black'>
                                                    {index + 1}. {item.title}
                                                </p>
                                                ) : ( <> </>)

                                            </>
                                        ) : (
                                            <div>

                                            </div>
                                        )
                                    }

                                    {/**Arrow button for collappsed video content*/}
                                    <div className='flex items-center'>
                                        <AiOutlineDelete
                                            className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                            onClick={() => {
                                                const updatedData = [...courseContentData];
                                                updatedData.splice(index, 1);
                                                setCourseContentData(updatedData);
                                            }}

                                        />

                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large"
                                            className='dark:text-white text-black'
                                            style={{
                                                transform: isCollapsed[index] ? "rotate[180deg]" : "rotate[0deg]",
                                            }}
                                            onClick={() => handleCollapseToggle(index)}
                                        />
                                    </div>
                                </div>
                                {
                                    !isCollapsed[index] && (
                                        <>
                                            {/*VIDEO TITLE*/}
                                            <div className='my-3'>
                                                <label className={styles.label}>Video Title</label>
                                                <input
                                                    type="text"
                                                    placeholder='Project Plan'
                                                    className={`${styles.input}`}
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].title = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                            </div>

                                            {/*VIDEO URL*/}
                                            <div className='my-3'>
                                                <label className={styles.label}>Video URL</label>
                                                <input
                                                    type="text"
                                                    placeholder='https://youtu.be/1aokooixKIo?si=aLS1SFOkVF8iylRz'
                                                    className={`${styles.input}`}
                                                    value={item.videoUrl}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].videoUrl = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                            </div>

                                            {/*VIDEO Description*/}
                                            <div className='my-3'>
                                                <label className={styles.label}>Video Description</label>
                                                <textarea
                                                    rows={8}
                                                    cols={30}
                                                    placeholder='Video Description Goes Here'
                                                    className={`${styles.input} !h-min py-2`}
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].description = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                                <br />
                                            </div>
                                            {

                                                item?.links.map((link: any, linkIndex: number) => (
                                                    <div className='mb-3 block'>
                                                        <div className='w-full flex items-center justify-between'>
                                                            <label className={`${styles.label}`}>Link {linkIndex + 1}</label>

                                                            <AiOutlineDelete
                                                                className={`${linkIndex === 0
                                                                    ? "cursor-no-drop"
                                                                    : "cursor-pointer"} text-black dark:text-white text-[20px]`}
                                                                onClick={() => linkIndex === 0 ? null : handleRemoveLink(index, linkIndex)}

                                                            />
                                                        </div>

                                                        <input
                                                            type="text"
                                                            placeholder='Source Code... (Link Title)'
                                                            className={`${styles.input}`}
                                                            value={link.title}
                                                            onChange={(e) => {
                                                                const updatedData = [...courseContentData];
                                                                updatedData[index].links[linkIndex].title = e.target.value;
                                                                setCourseContentData(updatedData);
                                                            }}
                                                        />

                                                        <input
                                                            type="text"
                                                            placeholder='Source Code URL... (Link URL)'
                                                            className={`${styles.input}`}
                                                            value={link.url}
                                                            onChange={(e) => {
                                                                const updatedData = [...courseContentData];
                                                                updatedData[index].links[linkIndex].url = e.target.value;
                                                                setCourseContentData(updatedData);
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            <br />
                                            {/*ADD LINK BUTTON*/}
                                            <div className='inline-block mb-4'>
                                                <p className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                                    onClick={() => handleAddLink(index)}
                                                >

                                                    <BsLink45Deg className='mr-2' /> Add Link

                                                </p>

                                            </div>
                                        </>
                                    )}
                                <br />
                                {/*Add New Content*/}
                                {index === courseContentData.length - 1 && (
                                    <div>
                                        <p className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                            onClick={(e: any) => newContentHandler(item)}
                                        >
                                            <AiOutlinePlusCircle className='mr-2' /> Add New Content
                                        </p>

                                    </div>
                                )}

                            </div>
                        </>
                    );
                })}
                <br />
                <div className='flex items-center text-[20px] dark:text-white text-black cursor-pointer'
                    onClick={() => addNewSection()}
                >
                    <AiOutlinePlusCircle className='mr-2' /> Add New Section
                </div>
            </form>
            <br />
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
    );
};

export default CourseContent