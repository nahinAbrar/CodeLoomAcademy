import React, { FC, useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button, Modal } from "@mui/material"
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { BsPencil } from 'react-icons/bs'
import Loader from '../../Loader/Loader'
import { format } from "timeago.js"
import { useDeleteUserMutation, useGetAllUserQuery, useUpdateUserRoleMutation } from '@/redux/features/user/userApi'
import { styles } from '@/app/styles/style'
import toast from 'react-hot-toast'



type Props = {
    isTeam: boolean;
}

const AllUsers: FC<Props> = ({ isTeam }) => {
    const { theme, setTheme } = useTheme();
    const [active, setActive] = useState(false);
    const { isLoading, data, refetch } = useGetAllUserQuery({},{refetchOnMountOrArgChange:true});
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('admin');
    const [open, setOpen] = useState(false);
    const [updateUserRole, { isSuccess: updateSuccess, error: updateError }] = useUpdateUserRoleMutation();
    const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation();

    const handleSubmit = async (role:any) => {
        await updateUserRole({ email, role });
    }

    const handleDelete = async () => {
        const id = userId;
        await deleteUser(id)
    }

    useEffect(() => {
        if (updateError) {
            if ("data" in updateError) {
                const errorMessage = updateError as any;
                toast.error(errorMessage.data.message);
            }
        }

        if (updateSuccess) {
            refetch();
            toast.success("User Role Updated!!");
            setActive(false);
        }

        if (deleteSuccess) {
            refetch();
            toast.success("User Deleted Successfully");
            setOpen(false);
        }

        if (deleteError) {
            if ("data" in deleteError) {
                const errorMessage = deleteError as any;
                toast.error(errorMessage.data.message);
            }
        }


    }, [updateError, updateSuccess, deleteSuccess, deleteError])



    const columns = [
        { field: "id", headerName: "ID", flex: 0.6 },
        { field: "name", headerName: "Name", flex: 0.8 },
        { field: "email", headerName: "Email", flex: 0.5 },
        { field: "role", idheaderName: "Role", flex: 0.3 },
        { field: "courses", headerName: "Purchased", flex: 0.3 },
        { field: "created_at", headerName: "Joined", flex: 0.3 },
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
                                setUserId(params.row.id);
                            }}
                        >
                            <AiOutlineDelete
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </Button>
                    </>
                )
            }
        },
        {
            field: "  ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <div className='mt-4 flex items-center ml-2'>
                            <a title='mailLink' href={`mailto:${params.row.email}`}>
                                <AiOutlineMail
                                    className='dark:text-white text-black'
                                    size={20}
                                />
                            </a>
                        </div>
                    </>
                )
            }
        }
    ]
    const rows: any = []

    if (isTeam) {
        const newData = data && data.users.filter((item: any) => item.role === "admin");
        newData && newData.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt),
            })
        })

    } else {
        data && data.users.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
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
                        {isTeam && (
                            <div className='w-full flex justify-end' onClick={() => setActive(!active)}>
                                <div className={`${styles.button} !w-[220px]`}>
                                    Add New Member
                                </div>
                            </div>
                        )
                        }
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
                        {active && (

                            <Modal
                                open={active}
                                onClose={() => setActive(!active)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                    <h1 className={`${styles.title}`}>
                                        Add New Member
                                    </h1>

                                    <div className='mt-4 flex-col items-center justify-center'>
                                        <input
                                            type="email"
                                            placeholder='Enter Email..'
                                            className={`${styles.input}`}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />

                                        <select
                                            name="role" id="role" title='selector'
                                            value={role}
                                            className={`${styles.input} !mt-6`}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                        </select>

                                        <button
                                            type='submit'
                                            className={`${styles.button} !mt-2`}
                                            onClick={() => handleSubmit(role)}
                                        >
                                            Submit
                                        </button>


                                    </div>
                                </Box>

                            </Modal>
                        )}

                        {open && (
                            <Modal
                                open={open}
                                onClose={() => setOpen(!open)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                    <h1 className={`${styles.title}`}>
                                        Sure You Want to delete this user?
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

export default AllUsers