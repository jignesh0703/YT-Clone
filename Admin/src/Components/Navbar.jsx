import axios from 'axios';
import React, { useContext, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { StoreContext } from '../context/Context';
import { toast } from 'react-toastify';

const Navbar = ({ setSawAll_Video, setSearch_Video }) => {

    const [Search, setSearch] = useState('')
    const { URL } = useContext(StoreContext)

    const SubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${URL}/api/admin/search`, { search: Search })
            setSearch_Video(response.data.FindVideo)
            setSawAll_Video(false)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    }

    return (
        <div className='p-6 px-[5rem] font-bold text-[1.5rem] flex items-center justify-between'>
            <h1 onClick={() => setSawAll_Video(true)} className='cursor-pointer'>StreamSphere</h1>
            <form className='border border-[#454545] items-center rounded-full overflow-hidden text-base flex w-max' onSubmit={SubmitHandler}>
                <input
                    type="text"
                    placeholder='Search'
                    className='text-[1.2rem] lg:w-[25rem] pl-4 border-none outline-none'
                    value={Search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button>
                    <CiSearch className='cursor-pointer hover:bg-slate-200 w-[5rem] h-[2.5rem] p-2 border-l-[1px] border-[#454545] text-center transition duration-200' />
                </button>
            </form>
        </div>
    )
}

export default Navbar