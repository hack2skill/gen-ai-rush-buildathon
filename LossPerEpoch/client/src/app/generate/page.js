import Image from 'next/image'
import { BsGithub } from "react-icons/bs"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <button className='p-4 bg-black rounded-md text-white flex items-center justify-center gap-5 text-xl'>Connect Github <BsGithub /></button>
        </main>
    )
}
