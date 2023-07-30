import React from 'react'

export default function NavbarButtons({text}) {
  return (
    <div className='flex flex-col font-semibold after:flex after:w-0 after:h-[2px] after:rounded hover:after:w-full after:transition-[width] cursor-pointer after:duration-300 after:bg-black dark:after:bg-slate-200 '>{text}</div>
  )
}
