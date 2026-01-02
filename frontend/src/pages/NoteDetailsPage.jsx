import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react';

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);

    setLoading(true);
    try {
      await api.post("/notes",
        {
          title,
          content
      })
      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      if(error.response?.status === 429){
        console.log("Failed to create note.", error);
        toast.error("Slow down! You're creating notes too fast.",
          {
            duration: 4000,
            icon: "🚦"
        });
      } else {
        console.log("Failed to create note.", error);
        toast.error("Failed to create note.");
      };
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async() => {};

  const {id} = useParams();
  console.log({id});

  useEffect(() => {
    const fetchNote= async() => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note.");
        console.log("Failed to fetch the note", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id])

  console.log( {note} ) 

  if(loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-5'/>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto font-mono'>
          <div className='flex items-center justify-between mb-6'>
            <Link to={'/'} className='btn btn-ghost mb-6 font-mono'>
              <ArrowLeftIcon className='size-4'/>
              Back to notes
            </Link>
            <button onClick={handleDelete} className='btn btn-ghost text-error'>
              <Trash2Icon className='h-4 w-4'/>
              Delete Note
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className='card-body'>
              {/* <div className='card-title text-2xl'>Create a New Note</div> */}
              <form onSubmit={handleDelete}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text" 
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={note.title}
                  onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea type="text" 
                  placeholder='Write your note here...'
                  className='textarea textarea-bordered h-32'
                  value={note.content}
                  onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className='card-actions justify-end'>
                  <button className='btn btn-primary text-amber-100' disabled={saving} onClick={handleSave}>
                    {saving ? 'Save...' : 'Save Changes'}
                  </button>
                </div>
              </form>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailsPage