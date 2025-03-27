import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/Context';

const Video = ({ id, setSawIndivisualVideo }) => {

    const { URL } = useContext(StoreContext)
    const [Video, setVideo] = useState(null)

    const FetchIndivisualVideo = async () => {
        try {
            const response = await axios.get(`${URL}/api/admin/fetchvideo/${id}`)
            console.log(response)
            setVideo(response.data.FindVideo)
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        }
    }

    useEffect(() => {
        FetchIndivisualVideo()
    }, [])

    return (
        <div className='w-full h-screen black-overlay top-0 left-0 fixed flex justify-center' onClick={() => setSawIndivisualVideo(false)}>
            <div className='bg-white w-max h-max mt-[5rem] p-4' onClick={(e) => e.stopPropagation()}>
                <div>
                    {
                        Video && <div>
                            <div className='w-[40rem] h-[25rem]'>
                                <video
                                    src={Video.videolink}
                                    className='w-[40rem] h-[25rem] bg-black'
                                    controls
                                    autoPlay
                                    loop
                                >
                                </video>
                            </div>
                            <div className='mt-4'>
                                <h1 className='w-[40rem] font-semibold'>{Video.title}</h1>
                                <h1 className='mt-2 font-semibold w-full border-t border-black pt-2'>Video Desciption</h1>
                                <p className='w-[40rem] mt-2'>{Video.desciption}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Video