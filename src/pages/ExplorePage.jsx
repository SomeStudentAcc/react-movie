import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'

export default function ExplorePage() {
  const params = useParams()
  const [pageNumber, setPageNumber] = useState(1)
  const [data, setData]= useState([])
  const [totalPageNum, setTotalPageNum] = useState(0)

  const fetchData = async()=>{
    try {
      const res = await axios.get(`/discover/${params.explore}`,{
        params: {
          page: pageNumber
        }
      } )
      setData((prev)=>{
        return [
          ...prev,
          ...res.data.results
        ]
      })
      setTotalPageNum(res.data.total_pages)
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  console.log((window.innerHeight + window.scrollY ));
  console.log(document.body.offsetHeight);

  const handleScroll= ()=>{
    console.log((window.innerHeight + window.scrollY ));
    console.log(document.body.offsetHeight);
    
    if((window.innerHeight + window.scrollY +1 ) >= document.body.offsetHeight){
      setPageNumber(prev => prev + 1)
    }
  }

  useEffect(()=>{
    fetchData()
  }, [pageNumber])

  useEffect(()=>{
    setPageNumber(1)
    setData([])
    fetchData()
  }, [params.explore])


  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className='py-16'>
      <div className='container mx-auto'>
        <h2 className='capitalize text-lg md:xl font-semibold my-3'>Popular {params.explore} show</h2>

        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center md:justify-start'>
          {
            data.map((el, index)=>{
              return(
                <Card data={el} key={el.id+'exploreSection'} media_type={params.explore}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
