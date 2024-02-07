import { useState, memo } from 'react';

export const Todos = memo(({ todos }) => {
  const updateTodos = async (id) => {
    await fetch("http://localhost:3001/completed", {
      method: "PUT",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(async (data) => {
      const res = await data.json();
    });
  };

  return (
    <div className='grid grid-cols-3 p-5'>
      {todos.map((element) => (
        <div className='w-75 p-5 rounded-lg border-2 border-black m-5' key={element._id}>
          <h1 className='heading'>{element.title}</h1>
          {/* <p className='description'>{element.description}</p> */}
          <button className='button' onClick={() => updateTodos(element._id)}>
            {element.completed ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </div>
  );
});
