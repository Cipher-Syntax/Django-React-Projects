import React from 'react'

const Note = ({note, onDelete, onEdit}) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString('en-US')

    return (
        <div className='p-[10px] my-[20px] mx-0 border-1 border-[#ccc] rounded-[5px]'>
            <p className='text-[#333] font-bold text-1xl mb-1'>{note.title}</p>
            <p className='text-[#666]'>{note.content}</p>
            <p className='text-[#999] text-[0.8rem] mb-2'>{formattedDate}</p>

            <button 
                type='button' 
                className='bg-[#007bff] text-white border-0 py-[10px] px-[20px] rounded-[5px] cursor-pointer ease-in-out hover:bg-[#0170e7] mr-3 w-[100px]'
                onClick={() => onEdit(note)}
            >
                Edit
            </button>
            <button 
                type='button' 
                onClick={() => {
                    if(window.confirm("Are you sure you want to delete this note?...")){
                        onDelete(note.id)
                    }
                }} 
                className='bg-[#f44336] text-white border-0 py-[10px] px-[20px] rounded-[5px] cursor-pointer ease-in-out hover:bg-[#d32f2f] w-[100px]'
            >
                Delete
            </button>
        </div>
    )
}

export default Note
