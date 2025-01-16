import React from 'react'
import { mobileNavigation } from '../constants/navigation'
import { NavLink } from 'react-router-dom'

export default function MobileNavigation() {
  return (
    <section className='md:hidden h-14 bg-black bg-opacity-70 backdrop-blur-2xl fixed bottom-0 w-full z-40'>
        <div className='flex items-center justify-between h-full text-neutral-400'>
          {
            mobileNavigation.map(el=>{
              return(
                <NavLink to={el.href} className={({isActive})=> `px-3 flex h-full items-center flex-col justify-center ${isActive && 'text-white'}`} key={el.label}>
                  <div className='text-2xl'>
                    {el.icon}
                  </div>
                  <p className='text-sm'>{el.label}</p>
                </NavLink>
              )
            })
          }
        </div>
    </section>
  )
}
