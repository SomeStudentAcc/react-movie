import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function BannerHome() {
  const bannerData = useSelector(state => state.movieReducer.bannerData);
  const imageUrl = useSelector(state => state.movieReducer.imageUrl);
  const [currentImg, setCurrentImg] = useState(0);

  const handleNext = () => {
    setCurrentImg(prev => (prev < bannerData.length - 1 ? prev + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentImg(prev => (prev > 0 ? prev - 1 : bannerData.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData, currentImg]);

  return (
    <section className='w-full h-full'>
      <div className='flex min-h-full max-h-[95vh] overflow-hidden'>
        {bannerData.map((el, index) => (
          <div
            key={el.id + 'bannerHome' + index}
            className='min-w-full min-h-[450px] md:min-h-full overflow-hidden relative group transition-all'
            style={{ transform: `translateX(-${currentImg * 100}%)` }}
          >
            <div className='w-full h-full'>
              <img className='h-full w-full object-cover' src={imageUrl + el.backdrop_path} alt="" />
            </div>

            <div className='absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:md:flex'>
              <button onClick={handlePrevious} className='bg-white p-1 rounded-full text-2xl z-10 text-black'><FaAngleLeft /></button>
              <button onClick={handleNext} className='bg-white p-1 rounded-full text-2xl z-10 text-black'><FaAngleRight /></button>
            </div>

            <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'></div>
            <div className='container mx-auto'>
              <div className='w-full absolute bottom-0 max-w-md px-3'>
                <h2 className='font-bold text-2xl md:text-4xl text-white drop-shadow-2xl'>
                  {el?.title || el?.name}
                </h2>
                <p className='text-ellipsis line-clamp-3 my-2'>{el.overview}</p>
                <div className='flex items-center gap-4'>
                  <p>Rating: {Number(el.vote_average).toFixed(1)}+</p>
                  <span>|</span>
                  <p>View: {Number(el.popularity).toFixed(0)}</p>
                </div>
                <Link to={'/' + el?.media_type + '/' + el.id}>
                  <button  className='bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                    Play Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
