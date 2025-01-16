import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetail from '../hooks/useFetchDetail'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Divider from '../components/Divider'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import VideoPlay from '../components/VideoPlay'

export default function DetailPage() {
  const params = useParams()
  const { data } = useFetchDetail(`/${params?.explore}/${params?.id}`)
  const { data: castData } = useFetchDetail(`/${params?.explore}/${params?.id}/credits`)
  const { data: similarData } = useFetchDetail(`/${params?.explore}/${params?.id}/similar`)
  const { data: recomendedData } = useFetchDetail(`/${params?.explore}/${params?.id}/recommendations`)
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState('')

  const imageUrl = useSelector(state => state.movieReducer.imageUrl)

  const duration = Number((data?.runtime) / 60).toFixed(1).split('.')
  const writer = castData?.crew?.filter(el => el.job === 'Writer').map(el => el.name).join(', ')

  const handlePlayVideo = (data)=>{
    setPlayVideoId(data)
    setPlayVideo(true)
  }

  return (
    <div>
      <div className='w-full h-[280px] relative hidden md:block'>
        <div className='w-full h-full'>
          <img className='h-full object-cover w-full' src={imageUrl + data?.backdrop_path} alt="" />
        </div>

        <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900/90 to-transparent'></div>
      </div>

      <div className='container mx-auto px-3 py-16 md:py-0 flex flex-col md:flex-row gap-5 md:gap-10'>
        <div className='md:-mt-28 relative mx-auto md:mx-0 w-fit min-w-60'>
          <img className='h-80 rounded object-cover w-60' src={imageUrl + data?.poster_path} alt="" />
          <button onClick={()=>handlePlayVideo(data)} className='mt-3 w-full py-2 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all'>Play Now</button>
        </div>

        <div>
          <h2 className='text-2xl md:text-4xl font-bold text-white'>{data?.title || data?.name}</h2>
          <p className='text-neutral-400'>{data?.tagline}</p>
          <Divider />

          <div className='flex items-center gap-3'>
            <p>
              Rating: {Number(data?.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>
              View: {Number(data?.vote_count)}
            </p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>
          <Divider />
          <div>
            <h3 className='text-xl font-bold text-white mb-1'>Overview</h3>
            <p>{data?.overview}</p>
            <Divider />

            <div className='flex items-center gap-4 my-3 text-center'>
              <p>
                Status: {data?.status}
              </p>
              <span>|</span>
              <p>
                Release Date: {moment(data?.release_date).format('MMMM Do YYYY')}
              </p>
              <span>|</span>
              <p>
                Revenue: {Number(data?.revenue)}
              </p>
            </div>
            <Divider />
          </div>

          <div>
            <p>
              <span className='text-white'>Director</span>: {castData?.crew?.[0]?.name || 'N/A'}
            </p>
            <Divider />
            <p>
              <span className='text-white'>Writer</span>: {writer || 'N/A'}
            </p>
          </div>
          <Divider />
          <h2 className='text-lg md:text-2xl font-bold my-3'>Cast:</h2>
          <div className='grid grid-cols-[repeat(auto-fit,96px)] gap-5'>
            {
              castData?.cast?.filter(el => el?.profile_path).map((el, index) => {
                return (
                  <div>
                    <div>
                      <img className='w-24 h-24 object-cover rounded-full' src={imageUrl + el.profile_path} alt="" />
                    </div>
                    <p className='font-bold text-center text-sm'>{el.name}</p>
                  </div>

                )
              })
            }
          </div>
        </div>
      </div>

      <div>
        <HorizontalScrollCard data={similarData.results} heading={`Similar`+params?.explore} media_type={params?.explore}/>
        <HorizontalScrollCard data={recomendedData.results} heading={`Recomendation `+params?.explore} media_type={params?.explore}/>
      </div>

      {
        playVideo && (
          <VideoPlay data={playVideoId} close={()=> setPlayVideo(false)} media_type={params?.explore}/>
        )
      }
            
      

    </div>
  )
}
