import React, { useEffect, useState } from 'react'
import SummaryApi from '../../common/index'
import { toast } from 'react-toastify'
import { MdModeEdit } from "react-icons/md";
//  import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    // const [openUpdateRole,setOpenUpdateRole] = useState(false)
    // const [updateUserDetails,setUpdateUserDetails] = useState({
    //     email : "",
    //     name : "",
    //     role : "",
    //     _id  : ""
    // })

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(SummaryApi.allUsers.url,{
            method : SummaryApi.allUsers.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])


    return (
        <div className='bg-white pb-4'>
          <table className='w-full userTable'>
            <thead>
              <tr className='bg-gray-800 text-white'>
                <th className='py-2 px-4'>Sr.</th>
                <th className='py-2 px-4'>Name</th>
                <th className='py-2 px-4'>Email</th>
                <th className='py-2 px-4'>Role</th>
                <th className='py-2 px-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((el, index) => (
                <tr key={el.email} className='hover:bg-gray-100'>
                  <td className='border-t py-2 px-4 text-center'>{index + 1}</td>
                  <td className='border-t py-2 px-4 '>{el?.name}</td>
                  <td className='border-t py-2 px-4'>{el?.email}</td>
                  <td className='border-t py-2 px-4'>{el?.role}</td>
                  <td className='border-t py-2 px-4 text-center'>
                    <button
                      className='bg-green-500 text-white p-2 rounded-full cursor-pointer hover:bg-green-700'
                      onClick={() => {
                        // setUpdateUserDetails(el);
                        // setOpenUpdateRole(true);
                      }}
                    >
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* {openUpdateRole && (
            <ChangeUserRole
              onClose={() => setOpenUpdateRole(false)}
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={fetchAllUsers}
            />
          )} */}
        </div>
      );
    }
    
    export default AllUsers;