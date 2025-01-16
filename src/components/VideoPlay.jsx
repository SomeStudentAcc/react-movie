import React from 'react';
import { IoClose } from 'react-icons/io5';
import useFetchDetail from '../hooks/useFetchDetail';

export default function VideoPlay({ data, close, media_type }) {
    const { data: videoData } = useFetchDetail(`/${media_type}/${data?.id}/videos`);
    const videoKey = videoData?.results?.[0]?.key;

    if (!videoKey) {
        return null; // Return null or some fallback UI if there's no video available
    }

    return (
        <section className='fixed inset-0 z-40 bg-neutral-700 bg-opacity-50 flex justify-center items-center'>
            <div className='relative bg-black rounded w-full max-w-4xl max-h-[90vh] aspect-video'>
                <button className='absolute -right-0 md:-right-4 -top-4 text-3xl text-white' onClick={close}>
                    <IoClose />
                </button>
                <iframe
                    src={`https://www.youtube.com/embed/${videoKey}`}
                    className='w-full h-full rounded'
                    title='Video Player'
                    allowFullScreen
                />
            </div>
        </section>
    );
}
