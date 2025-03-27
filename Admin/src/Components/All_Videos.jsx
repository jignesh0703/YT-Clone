import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../context/Context'
import { toast } from 'react-toastify'
import { formatDistanceToNowStrict } from 'date-fns'
import { HiOutlineDotsVertical } from "react-icons/hi";
import Video from './Video'

const All_Videos = () => {

    const { URL } = useContext(StoreContext)
    const [Videos, setVideos] = useState(null)
    const [SawDelete, setSawDelete] = useState(null)
    const MenuRef = useRef(null)
    const [TrackVideo, setTrackVideo] = useState(false)
    const [SawIndivisualVideo, setSawIndivisualVideo] = useState(false)
    const [SelectVideoId, setSelectVideoId] = useState(null)

    const FetchVideos = async () => {
        try {
            const responce = await axios.get(`${URL}/api/admin/fetch`)
            setVideos(responce.data.FindVideos)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    }

    useEffect(() => {
        FetchVideos()
    }, [TrackVideo])

    useEffect(() => {
        const ClickOutside = (event) => {
            if (MenuRef.current && !MenuRef.current.contains(event.target)) {
                setSawDelete(null)
            }
        }
        document.addEventListener('mousedown', ClickOutside)
        return () => document.removeEventListener("mousedown", ClickOutside);
    }, [SawDelete])

    const DeleteVideo = async (id) => {
        try {
            const response = await axios.delete(`${URL}/api/admin/delete/${id}`)
            toast.success(response.data.message)
            setTrackVideo(!TrackVideo)
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
        <div className='flex flex-wrap gap-[3rem] p-12 px-[5rem]'>
            {
                Videos &&
                Videos.map((item, index) => {
                    return <div key={index} className='rounded-[10px] overflow-hidden'>
                        <div
                            className='w-[20rem] h-[12rem] object-cover cursor-pointer'
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
                            <div className='w-[14.5rem]'>
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
                                    className='absolute ml-[12rem] mt-4 bg-white shadow-md p-1 px-3 border border-gray-300 cursor-pointer font-semibold'
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
            {
                SawIndivisualVideo && <Video id={SelectVideoId} setSawIndivisualVideo={setSawIndivisualVideo} />
            }
        </div>
    )
}

export default All_Videos