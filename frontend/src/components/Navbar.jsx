import React from 'react'
import { Link } from 'react-router'
import {Plus} from 'lucide-react'

const NavBar = () => {
    return (
        <header className='bg-base-100 border-base-content/10'>
            <div className='mx-auto max-w-6xl px-4 py-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>
                        LangNote
                    </h1>
                    <Link to={"/create"} className='btn btn-primary text-lg text-amber-50 font-medium font-mono gap-2 tracking-wide'>
                        <span>New Note</span>
                        <Plus className='size-5'/>
                    </Link>
                </div>

            </div>

        </header>
    )
}

export default NavBar