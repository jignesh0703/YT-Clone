import axios from 'axios'
import { formatDistanceToNowStrict } from 'date-fns'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from '../context/Context'
import { toast } from 'react-toastify'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import Video from './Video'

const Search = ({ Search_Video }) => {

  const { URL } = useContext(StoreContext)
  const [SawDelete, setSawDelete] = useState(null)
  const MenuRef = useRef(null)
  const [SawIndivisualVideo, setSawIndivisualVideo] = useState(false)
  const [SelectVideoId, setSelectVideoId] = useState(null)

  useEffect(() => {
    const ClickOutSide = (e) => {
      if (MenuRef.current && !MenuRef.current.contains(e.target)) {
        setSawDelete(null)
      }
    }
    document.addEventListener('mousedown', ClickOutSide)
    return () => document.removeEventListener('mousedown', ClickOutSide)
  }, [SawDelete])

  const DeleteVideo = async (id) => {
    try {
      const response = await axios.delete(`${URL}/api/admin/delete/${id}`)
      toast.success(response.data.message)
      setSawDelete(null)
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
      <div className='flex flex-col items-center gap-8 mt-[3rem]'>
        {
          Search_Video &&
          Search_Video.map((item, index) => {
            return <div key={index}>
              <div
                className='w-[22rem] h-[12rem] object-cover cursor-pointer'
                onClick={() => {
                  setSawIndivisualVideo(true)
                  setSelectVideoId(item._id)
                }}
              >
                <img src={item.thumbnail} alt="thumnails" className='w-[25rem] h-full object-cover rounded-[10px]' />
              </div>
              <div className='mt-2 flex gap-4'>
                <div className='w-[2rem] h-[2rem]'>
                  <img src={item.owner.avatar} alt="avatars" className='w-full h-full object-cover rounded-full' />
                </div>
                <div className='w-[16rem]'>
                  <h1 className='font-bold'>
                    {item.title.length > 55 ? item.title.substring(0, 55) + '...' : item.title}
                  </h1>
                  <h1 className='text-[.8rem]'>{item.owner.channel_name}</h1>
                  <div className='flex text-[.8rem] gap-2 items-center'>
                    <h1>{item.views} Views</h1>
                    <hr className='bg-gray-800 rounded-full w-[3px] h-[3px]' />
                    <h1>{formatDistanceToNowStrict(new Date(item.createdAt), { addSuffix: true })}</h1>
                  </div>
                </div>
                <div className='w-max h-max cursor-pointer' onClick={() => setSawDelete(SawDelete === index ? null : index)}>
                  <HiOutlineDotsVertical className='text-[1.2rem] text-gray-600 mt-1' />
                </div>
                {
                  SawDelete === index
                  && <div
                    className='absolute ml-[13rem] mt-4 bg-white shadow-md p-1 px-3 border border-gray-300 cursor-pointer font-semibold'
                    ref={MenuRef}
                    onClick={() => DeleteVideo(item._id)}
                  >
                    <h1>Delete Video</h1>
                  </div>
                }
              </div>
            </div>
          })
        }
      </div>
      {
        SawIndivisualVideo && <Video id={SelectVideoId} setSawIndivisualVideo={setSawIndivisualVideo} />
      }
    </>
  )
}

export default Search