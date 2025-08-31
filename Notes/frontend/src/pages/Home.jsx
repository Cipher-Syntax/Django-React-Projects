import React, { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Notes';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null); // track which note we are editing

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        // Get all notes
        api.get('api/notes/')
            .then((response) => response.data)
            .then(data => setNotes(data))
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        // Delete note
        api.delete(`api/notes/delete/${id}/`)
            .then((response) => {
                if(response.status === 204){
                    setNotes(notes.filter(note => note.id !== id));
                }
            })
            .catch((err) => alert(err));
    };

    const createOrUpdateNote = (e) => {
        e.preventDefault();

        if(editingNoteId) {
            // Update existing note
            api.put(`api/notes/update/${editingNoteId}/`, { title, content })
                .then(response => {
                    setNotes(notes.map(note => note.id === editingNoteId ? response.data : note));
                    setTitle('');
                    setContent('');
                    setEditingNoteId(null);
                })
                .catch(err => alert(err));
        } 
        else {
            // Create new note
            api.post('api/notes/', { title, content })
                .then(response => {
                    if(response.status === 201) {
                        setNotes([response.data, ...notes]);
                        setTitle('');
                        setContent('');
                    } else {
                        alert("Failed to make note");
                    }
                })
                .catch(err => alert(err));
        }
    };

    const editNote = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditingNoteId(note.id);
    };

    return (
        <>
            <a href="/logout" className='p-4 mt-6 font-bold hover:underline'>Logout</a>
            
            <div className='font-Verdana p-[20px] flex flex-col items-center mt-[100px]'>
                {/* Form at the top */}
                <form onSubmit={createOrUpdateNote} className='bg-white p-[20px] rounded-[8px] shadow-2xl w-full max-w-[500px] mb-[40px]'>
                    <h2 className='text-black text-[24px] mb-[20px] text-center underline'>
                        {editingNoteId ? "Edit Note" : "Create A Note"}
                    </h2>
                    
                    <label htmlFor="title" className='font-bold mt-[10px]'>Title: </label> <br />
                    <input 
                        type="text" 
                        name='title' 
                        required 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder='Enter title...' 
                        value={title} 
                        className='w-full p-2 my-[8px] border-1 rounded-[4px] box-border' 
                    />

                    <label htmlFor="content" className='font-bold mt-[10px]'>Content: </label> <br />
                    <textarea 
                        name='content' 
                        required 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder='Enter content...' 
                        value={content} 
                        className='w-full p-2 my-[8px] border-1 rounded-[4px] box-border' 
                    /> <br />

                    <button 
                        type='submit' 
                        className='bg-[#007bff] text-white py-[10px] px-[20px] border-0 rounded-[4px] cursor-pointer text-[16px] hover:bg-[#0056b3] block mx-auto'
                    >
                        {editingNoteId ? "Update Note" : "Create Note"}
                    </button>
                </form>

                {/* Notes list below */}
                <div className='w-full max-w-[800px]'>
                    <h2 className='text-[#333] text-[24px] mb-[16px]'>Notes</h2>
                    {notes.length === 0 ? (
                        <p>No notes yet, create one...</p>
                    ) : (
                        <div>
                            {notes.map((note) => (
                                <Note 
                                    note={note} 
                                    onDelete={deleteNote} 
                                    onEdit={editNote}
                                    key={note.id} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
        
    )
}

export default Home
