import React from 'react'
import DarkModeButton from './DarkModeButton'
import NavbarButtons from './Navbar/NavbarButtons'

export default function Navbar() {
  return (
    <nav className='w-full z-30 fixed top-0 left-0 p-4 bg-slate-100/30 backdrop-blur dark:bg-slate-900/70 flex justify-between'>
        <div className='text-purple-600 dark:text-purple-300 font-semibold text-xl'>AgriSenseAI</div>
        <div className='gap-4 flex text-black items-center dark:text-slate-200'>
            <NavbarButtons text={"About"}/>
            <NavbarButtons text={"Resources"}/>
            <div className='h-full w-[2px] rounded-full bg-black dark:bg-slate-200'></div>
            <DarkModeButton/>
        </div>
    </nav>
  )
}
