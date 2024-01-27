// import { useState } from 'react'

// export function CreateTodo() {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");

//     return <div>
//         <input type="text" placeholder="Title" onChange={(e) => {
//             setTitle(e.target.value);
//         }}></input>
//         <input type="text" placeholder="Description" onChange={(e) => {
//             setDescription(e.target.value);
//         }}></input>
//         <button onClick={async () => {
//             await fetch("http://localhost:3000/todo", {
//                 method: "POST",
//                 body: {
//                     title: title,
//                     description: description,
//                     completed: false
//                 },
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             })
//             const data = await res.json()
//             alert(data)
//             alert("Todo added!")
//         }}>Add Todo</button>
//     </div>
// }
import { useState } from 'react';

export function CreateTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addTodo = async () => {
        try {
            const res = await fetch("http://localhost:3000/todo", {
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
        <div>
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
        </div>
    );
}
