import React from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Card({ data, trending, index, media_type }) {
    const imageUrl = useSelector(state => state.movieReducer.imageUrl);
    const mediaType = data.media_type ?? media_type

    return (
        <Link to={'/'+mediaType+'/'+data.id} className='w-full min-w-[230px] max-w-[230px] rounded h-80 overflow-hidden block relative hover:scale-105 transition-all'>
            {
                data?.poster_path ? (
                    <img src={imageUrl + data?.poster_path} alt="" />
                ):(
                    <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>No image Found</div>
                )
            }
            <div className='absolute top-4'>
                {
                    trending && (
                        <div className='py-1 px-4 bg-black/60 overflow-hidden backdrop-blur-3xl rounded-r-full'>
                            #{index} Trending
                        </div>
                    )
                }
            </div>
            <div className='absolute bottom-0 h-13.5 backdrop-blur-3xl w-full bg-black/55 p-2'>
                <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
                <div className='text-sm text-neutral-400 flex justify-between items-center'>
                    <p>{moment(data?.release_date).format("MMMM Do YYYY")}</p>
                    <p className='bg-black px-1 rounded-full text-xs text-white'>Rating: {Number(data?.vote_average).toFixed(1)}</p>
                </div>
            </div>
        </Link>
    )
}
