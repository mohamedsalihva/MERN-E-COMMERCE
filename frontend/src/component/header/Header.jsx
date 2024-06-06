import { Link, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { AiFillAmazonSquare } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../../store/userSlice';
import { useContext, useState } from 'react';
import ROLE from '../../common/role/role';
import Context from '../../context/context';
 import {FaBell } from 'react-icons/fa';

function Header() {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const navigate = useNavigate()
  const context = useContext(Context)
  console.log("user header:", user)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }

  }
console.log("cart:",context)
return (
  <header className='fixed top-0  left-0 right-0 z-50 h-16 shadow-md bg-white '>
    <div className='container mx-auto flex items-center px-4 justify-between h-full '>
      <div className='ml-4 flex items-center'>
        <Link to={"/"}>
          <AiFillAmazonSquare className='text-cyan-500 w-12 h-12' />
        </Link>
      </div>

      <div className='hidden lg:flex items-center bg-gray-100 rounded-md'>
        <input
          type="text"
          placeholder='Search products here ...'
          className='flex-grow px-4 py-2 rounded-l-md outline-none text-sm'
        />
        <div className='bg-cyan-500 text-white p-2 rounded-r-md cursor-pointer'>
          <CiSearch size={20} />
        </div>
      </div>

      <div className='flex items-center gap-7'>
        <div className='relative flex justify-center'>
          {user?._id && (
            <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
              {user?.profilePic ? (
                <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
          )}
          {menuDisplay && (
            <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
              <nav>
                {user?.role === ROLE.ADMIN && (
                  <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                )}
              </nav>
            </div>
          )}
        </div>

        {user?._id && (
          <Link to={"/cart"} className='text-2xl relative'>
            <span><FaShoppingCart /></span>
            <div className='bg-red-600 text-white h-5 w-5 p-1 flex items-center justify-center absolute -top-2 -right-3 rounded-full'>
              <p className='text-sm'>{context?.cartcount}</p>
            </div>
          </Link>
        )}

        <div className="flex items-center gap-4">
          {user?._id && (
            <div className="text-gray-600 cursor-pointer hover:text-cyan-500">
              <FaBell size={20} />
            </div>
          )}
          
          <div>
            {user?._id ? (
              <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-cyan-500 hover:bg-red-700'>Logout</button>
            ) : (
              <Link to={"/login"} className='px-6 py-2 rounded-full text-white bg-cyan-500 hover:bg-cyan-200'>Login</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  </header>
);
}
export default Header;
