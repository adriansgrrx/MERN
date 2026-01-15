import React from 'react'
import { Link, useNavigate } from 'react-router'
import { PenSquareIcon, Trash } from 'lucide-react'
import { formatDate, formatToUppercase } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'

const NoteCard = ({note, setNotes, onOpen, onDeleted}) => {
    const navigate = useNavigate();
    
    const handleUpdate = async (e) => {
        e.stopPropagation(); // Prevent card click
        e.preventDefault();
        navigate(`/note/${note._id}`);
    };
    
    const handleDelete = async (e, id) => {
        e.stopPropagation(); // Prevent card click
        e.preventDefault();
        
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id));
            
            // Call the onDeleted callback to close modal if this note is open
            if (onDeleted) {
                onDeleted(id);
            }
            
            toast.success("Note deleted successfully.");
        } catch (error) {
            console.log("Failed to delete note", error);
            toast.error("Failed to delete the note.");
        }
    };
    
    return (
        <div onClick={() => onOpen(note)} className="card bg-base-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
            <div className='card-body font-mono text-xs lg:text-sm xl:text-sm'>
                <h3 className='card-title text-base-content line-clamp-3'>{formatToUppercase(note.title)}</h3>
                <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-base-content'>{formatDate(new Date(note.createdAt))} </span>
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