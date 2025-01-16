import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

export default function SearchPage() {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState()
  const navigate = useNavigate()

  const query = location?.search?.slice(3)

  const fetchData = async () => {
    try {
      const res = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page
        }
      })
      setData((prev) => {
        return [
          ...prev,
          ...res.data.results
        ]
      })

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (query) {
      setPage(1)
      setData([])
      fetchData()
    }
  }, [location.search])

  const handleScroll= ()=>{    
    if((window.innerHeight + window.scrollY +1 ) >= document.body.offsetHeight){
      setPage(prev => prev + 1)
    }
  }

  useEffect(()=>{
    if(query){
      fetchData()
    }
  }, [page])

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='py-16'>
      <div className='md:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input value={query.split('%20').join(' ')} className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900' type="text" placeholder='Search here...' onChange={(e)=> navigate(`/search?q=${e.target.value}`)} />
      </div>
      <div className='container mx-auto'>
        <h2 className='capitalize text-lg md:xl font-semibold my-3'>Search Results</h2>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center md:justify-start'>
          {
            data.map((el, index) => {
              return (
                <Card data={el} key={el.id + 'searchSection'} media_type={el.media_type} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
