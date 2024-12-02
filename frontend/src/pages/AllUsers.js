import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""

  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include',
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

  }
  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className='bg-white py-4 px-4 rounded'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-slate-950 text-white'>
            <th className='p-2'>No </th>
            <th className='p-2'>Name </th>
            <th className='p-2'>Email </th>
            <th className='p-2'>Role </th>
            <th className='p-2'>Created At </th>
            <th className='p-2'>Action </th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((el, index) => {
            return (
              <tr className='hover:bg-slate-200'>
                <td className='p-2'>{index + 1}</td>
                <td className='p-2'>{el?.name}</td>
                <td className='p-2'>{el?.email}</td>
                <td className='p-2'>{el?.role}</td>
                <td className='p-2'>{moment(el?.createdAt).format("LL")}</td>
                <td className='flex justify-center gap-3'>
                  <button className='bg-green-400 p-2 rounded-full cursor-pointer hover:bg-green-600 hover:text-white'
                    onClick={() => {
                      setUpdateUserDetails(el)
                      setOpenUpdateRole(true)
                    }}
                  >
                    <MdModeEditOutline />
                  </button>

                  
                </td>
              </tr>
            )

          })
          }

        </tbody>
      </table>


      {
        openUpdateRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc={fetchAllUsers}
          />
        )
      }

    </div>
  )
}

export default AllUsers