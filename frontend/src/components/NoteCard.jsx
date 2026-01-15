import React from 'react'
import { Link, useNavigate } from 'react-router'
import { PenSquareIcon, Trash } from 'lucide-react'
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes}) => {
    const navigate = useNavigate();
    
    const handleUpdate = async (e, id) => {
        e.preventDefault();
        navigate(`/note/${note._id}`)
    };


    const handleDelete = async (e, id) => {
        e.preventDefault();
        
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id));
            toast.success("Note deleted successfully.");

        } catch (error) {
            console.log("Failed to delete note", error);
            toast.error("Failed to delete the note.");
        }
    };

    return (
        <div className="card bg-base-200 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-primary">
            <div className='card-body font-mono'>
                <h3 className='card-title text-base-content'>{note.title}</h3>
                <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content'>{formatDate(new Date(note.createdAt))} </span>
                    <div className='flex items-center gap-1'>
                        <button className='btn btn-ghost btn-xs' onClick={handleUpdate}>
                            <PenSquareIcon className='size-4'/>
                        </button>
                        <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                            <Trash className='size-4'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteCard