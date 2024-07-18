import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, Modal } from "@mui/material"
import { AiOutlineDelete } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { BsPencil } from 'react-icons/bs'
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import Loader from '../../Loader/Loader'
import { format } from "timeago.js"
import { styles } from '@/app/styles/style'
import { deleteCourse } from '../../../../../server/controllers/course.controller';
import toast from 'react-hot-toast'
import Link from 'next/link'


type Props = {}

const AllCourses = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState('');
    const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
    const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteCourseMutation({});


    const handleDelete = async () => {
        const id = courseId;
        deleteCourse(id);
    }

    useEffect(() => {
        if (deleteSuccess) {
            refetch();
            toast.success("Course Deleted Successfully.");
            setOpen(!open);
        }
        if (deleteError) {
            if ("data" in deleteError) {
                const errorMessage = deleteError as any;
                toast.error(errorMessage.data.message);
                setOpen(!open);
            }
        }
    }, [deleteSuccess, deleteError])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "title", headerName: "Course Title", flex: 1 },
        { field: "ratings", headerName: "Ratings", flex: 0.5 },
        { field: "purchased", headerName: "Purchased", flex: 0.5 },
        { field: "created_at", headerName: "Created At", flex: 0.5 },
        {
            field: " ",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <div className='flex mt-4 justify-center'>
                            <Link href={`/admin/edit-course/${params.row.id}`}>
                                <BsPencil
                                    className='dark:text-white text-black'
                                    size={20}
                                />
                            </Link>
                        </div>
                    </>
                )
            }
        },
        {
            field: "",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button
                            onClick={() => {
                                setOpen(!open);
                                setCourseId(params.row.id);
                            }}>
                            <AiOutlineDelete
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </Button>
                    </>
                )
            }
        }
    ]
    const rows: any = []
    {
        data && data.courses.forEach((item: any) => {
            rows.push({
                id: item._id,
                title: item.name,
                ratings: item.ratings,
                purchased: item.purchased,
                created_at: format(item.createdAt),
            })
        })
    }


    return (
        <div className='mt-[120px]'>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box m="20px">
                        <Box m="40px 0 0 0"
                            height="80vh"
                            sx={{
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                    outline: "none",
                                },
                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-sortIcon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderBottom: theme === "dark" ? "1px solid #ffffff30!important" : "1px solid #ccc!important"
                                },
                                "& .MuiTablePagination-root": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none",
                                },
                                "& .name-column--cell": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-columnHeader": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    borderBottom: "none",
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                },
                                "& .MuiDataGrid-columnHeaderTitleContainer": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderTop: "none",
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                },
                                "& .MuiCheckbox-root": {
                                    color: theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: `#fff !important`,
                                }
                            }}

                        >
                            <DataGrid checkboxSelection rows={rows} columns={columns} />
                        </Box>
                        {open && (
                            <Modal
                                open={open}
                                onClose={() => setOpen(!open)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                    <h1 className={`${styles.title}`}>
                                        Sure You Want to delete this Course?
                                    </h1>

                                    <div className='w-full mt-4 flex justify-between text-white gap-4'>
                                        <button
                                            type='submit'
                                            className={`${styles.button} !mt-2 !w-[120px]`}
                                            onClick={() => setOpen(!open)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type='submit'
                                            className={`${styles.button} !mt-2 !bg-[crimson] !w-[120px]`}
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>


                                    </div>
                                </Box>

                            </Modal>
                        )

                        }
                    </Box>
                )
            }
        </div>
    )

}

export default AllCourses