import React from 'react'
import { Link } from 'react-router'
import { NotebookIcon } from 'lucide-react'

const NotesNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center font-mono">
            <div className="bg-primary/10 rounded-full p-8">
                <NotebookIcon className="size-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">No notes yet</h3>
            <p className="text-base-content/70">
                Hi, Lang! You don't have any notes yet. Create your first note to get started.
            </p>
            <Link to="/create" className="btn btn-primary text-lg text-amber-100 font-medium font-mono gap-2 tracking-wide">
                Create Your First Note
            </Link>
        </div>

    )
}

export default NotesNotFound