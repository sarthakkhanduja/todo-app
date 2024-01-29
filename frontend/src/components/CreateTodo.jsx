import { useState } from 'react';
import './CreateTodo.css'
import { RefreshButton } from './RefreshButton';

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTodo = async () => {
        try {
            const res = await fetch("http://localhost:3001/todo", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description,
                    completed: false
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Todo creation failed");
            }

            const data = await res.json();
            alert("Todo added!");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    return (
        <div className='parentDiv'>
            <input className='inputBox' type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input className='inputBox' type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <button className='addButton' onClick={addTodo}>Add Todo</button>
        </div>
    );
}
