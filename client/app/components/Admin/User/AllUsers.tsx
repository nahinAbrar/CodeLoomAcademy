import React, { FC } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import { Box, Button } from "@mui/material"
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import { useTheme } from 'next-themes'
import { BsPencil } from 'react-icons/bs'
import Loader from '../../Loader/Loader'
import { format } from "timeago.js"
import { useGetAllUserQuery } from '@/redux/features/user/userApi'


type Props = {
    isTeam: boolean;
}

const AllUsers: FC<Props> = ({ isTeam }) => {
    const { theme, setTheme } = useTheme();

    const { isLoading, data, error } = useGetAllUserQuery({});

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
                        <Button>
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
        const newData = data && data.users.filter((item:any) => item.role === "admin");
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
                    </Box>
                )
            }
        </div>
    )

}

export default AllUsers