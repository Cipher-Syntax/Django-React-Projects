import React, { useState, useEffect } from 'react';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';
import { IoIosArrowRoundBack } from "react-icons/io";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('api/categories/', {
                headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
            });
            setCategories(response.data);
        } 
        catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image);
        formData.append('category_id', categoryId);

        try {
            const response = await api.post('api/posts/', formData, {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`
                }
            });
            console.log(response.data);
            setMessage("Successfully created a blog");
            setTitle("");
            setContent("");
            setImage(null);
            setCategoryId("");
        } 
        catch (error) {
            console.error('Failed to create blog: ', error);
            setMessage("Failed to create a blog");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-[20px]"> 
            <a href="/"><IoIosArrowRoundBack size={30}/> </a>
            <h1 className="text-2xl font-bold mb-5">Create Post</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded" required/>

                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} className="border p-2 rounded h-32" required/>

                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required/>

                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="border p-2 rounded" require >
                    <option value="" disabled>Select category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-red-400 text-white font-bold p-2 rounded hover:bg-red-500"
                >
                    Create Post
                </button>
            </form>

            {message && (
                <p className={`mt-4 text-center ${message.includes("Successfully") ? "text-green-400" : "text-red-500"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default CreatePost;
