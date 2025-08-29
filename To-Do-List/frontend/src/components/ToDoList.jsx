import React, { useState, useEffect } from 'react'


const ToDoList = () => {

    const [todos, setTodo] = useState([]);
    const [inputValue, setInputValue] = useState("");
    
    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async () => {
        try{
            const response = await fetch("http://127.0.0.1:8000/api/todos/");
            const data = await response.json();

            console.log(data)
            setTodo(data)
        }
        catch(error){
            console.error("Failed to fetch todos: ", error)
        }
    }

    const addTask = async () => {
        try{
            if(inputValue.trim()){
                const response = await fetch("http://127.0.0.1:8000/api/todos/", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        todo: inputValue
                    })
                })

                const data = await response.json();
                setTodo([data, ...todos]);
                setInputValue("");
            }
        }
        catch(error){
            console.error("Failed to add task: ", error)
        }
    }

    const deleteTask = async (id) => {
        try{
            await fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
                method: "DELETE",
            })

            setTodo(todos.filter((todo) => todo.id !== id ))
        }
        catch(error){
            console.error("Failed to delete task: ", error)
        }
    }

    const markAsDone = async (id, completed) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/todos/${id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: !completed, 
                }),
            });

            if (!response.ok) {
                console.error("Failed to update todo");
                return;
            }

            const updatedTodo = await response.json();
            setTodo((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
                )
            );
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className='w-full p-20 mx-auto'>
            <h1 className='text-center font-bold text-3xl'>To-Do-List</h1>

            <div className='w-[70%] mx-auto border-1 flex flex-col items-center justify-between p-[10px] gap-2'>
                <div className="flex flex-col w-[90%]">
                    <label htmlFor="Todo" className='font-bold'>Todo</label>
                    <input type="text" placeholder='Enter todo...' value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='outline-1 border-0 py-[8px] px-[8px]' />
                </div>

                <button onClick={addTask} className='w-[150px] bg-[#000300] h-[40px] text-white cursor-pointer rounded-lg'>Add Task</button>
            </div>

            {/* NOT COMPLETED TASKS */}
            <div className='border-1 mt-10 p-[10px]'>
                <div>
                    <h2>Todo</h2>
                    <ul>
                        {
                            todos.filter((todo) => !todo.completed).map((todo) => (
                                <li key={todo.id} className='flex px-[20px] justify-between items-center'>
                                    <p className='w-[80%] mt-5'>{todo.todo}</p>
                                    <button onClick={() => markAsDone(todo.id, todo.completed)} className='cursor-pointer'>✅</button>
                                    <button onClick={() => deleteTask(todo.id)} className='cursor-pointer  w-[100px] bg-amber-600 h-[36px] text-white rounded-lg'>Delete</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            
            {/* COMPLETED TASK */}
            <div className='border-1 mt-10 p-[10px]'>
                <div>
                    <h2>Completed Tasks</h2>
                    <ul>
                        {
                            todos.filter((todo) => todo.completed).map((todo) => (
                                <li key={todo.id} className='flex px-[20px] justify-between items-center'>
                                    <p className='w-[80%] mt-5 line-through'>{todo.todo}</p>
                                    <button onClick={() => markAsDone(todo.id, todo.completed)} className='cursor-pointer'>❌</button>
                                    <button onClick={() => deleteTask(todo.id)} className='cursor-pointer  w-[100px] bg-amber-600 h-[36px] text-white rounded-lg'>Delete</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ToDoList