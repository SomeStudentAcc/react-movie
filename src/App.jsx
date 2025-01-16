import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setBannerData, setImageUrl } from './store/movieSlice'

export default function App() {
  const dispatch = useDispatch()
  const fetchTrendingData = async()=>{
    try {
      const res = await axios.get('/trending/all/week')
      dispatch(setBannerData(res.data.results))
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchConfiguration = async()=>{
    try {
      const res = await axios.get('/configuration')
      dispatch(setImageUrl(res.data.images.secure_base_url+ 'original'))      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchTrendingData()
    fetchConfiguration()
  }, [])
  return (
    <div className='pb-14 md:pb-0'>
      <Header/>
      <div className='min-h-[90vh]'>
        <Outlet/>
      </div>
      <Footer/> 
      <MobileNavigation/> 
    </div>
  )
}
