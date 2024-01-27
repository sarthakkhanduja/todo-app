import { useState } from 'react';

export function Todos({ todos }) {
  const updateTodos = async (id) => {
    await fetch("http://localhost:3000/completed", {
      method: "PUT",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (data) => {
      const res = await data.json();
      alert(res);
    });
  };

  return (
    <div>
      {todos.map((element) => (
        <div key={element._id}>
          <h1>{element.title}</h1>
          <p>{element.description}</p>
          <button onClick={() => updateTodos(element._id)}>
            {element.completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </div>
  );
}
