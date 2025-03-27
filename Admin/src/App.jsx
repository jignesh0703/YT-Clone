import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import All_Videos from './Components/All_Videos'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Search from './Components/Search';
import axios from 'axios';
import { StoreContext } from './context/Context';
import Login from './Components/Login';

const App = () => {

  const { URL } = useContext(StoreContext)
  const [SawAll_Video, setSawAll_Video] = useState(true)
  const [Search_Video, setSearch_Video] = useState(null)
  const [isLogined, setisLogined] = useState(null)

  const CheckIslogin = async () => {
    try {
      const response = await axios.get(`${URL}/api/admin/check`, {
        withCredentials: true
      })
      setisLogined(response.data.isLogin)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    CheckIslogin()
  }, [isLogined])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {
        isLogined ?
          (
            <>
              <Navbar setSawAll_Video={setSawAll_Video} setSearch_Video={setSearch_Video} />
              {
                SawAll_Video
                  ? <All_Videos />
                  : <Search Search_Video={Search_Video} />
              }
            </>
          ) : (
            <Login setisLogined={setisLogined} />
          )
      }

    </>
  )
}

export default App