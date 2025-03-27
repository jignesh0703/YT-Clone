import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { StoreContext } from '../context/Context'

const Login = ({ setisLogined }) => {

  const { URL } = useContext(StoreContext)
  const [formdata, setformdata] = useState({
    email: '',
    password: ''
  })

  const ChangeHandler = (e) => {
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value
    })
  }

  const SubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${URL}/api/admin/login`, formdata, {
        withCredentials: true
      })
      toast.success(response.data.message)
      setisLogined(true)
      console.log(response)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  }

  return (
    <>
      <div className='w-full flex justify-center mt-[3rem]'>
        <div className='p-6 px-12 shadow-md rounded-[15px] border'>
          <div className='font-semibold text-[1.5rem]'>
            <h1>Admin Panel</h1>
          </div>
          <form className='mt-4' onSubmit={SubmitHandler}>
            <div className='flex flex-col gap-1'>
              <label className='font-semibold text-[1.2rem]'>Enter Email</label>
              <input
                type="text"
                name='email'
                className='border border-black outline-none pl-4 p-2 w-[15rem] rounded-[5px]'
                value={formdata.email}
                onChange={ChangeHandler}
                required
              />
            </div>
            <div className='flex flex-col gap-1 mt-4'>
              <label className='font-semibold text-[1.2rem]'>Enter Password</label>
              <input
                type="password"
                name='password'
                className='border border-black outline-none pl-4 p-2 w-[15rem] rounded-[5px]'
                value={formdata.password}
                onChange={ChangeHandler}
                required
              />
            </div>
            <div className='mt-8 flex justify-center'>
              <button className='w-[15rem] p-2 bg-[#F14A00] text-white font-semibold shadow-md rounded-[5px]'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login