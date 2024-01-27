import { useState } from 'react'

export function Todos({todos}) {
    return <div>
        {todos.map((element) => {
            return <div>
                <h1>{element.title}</h1>
                <p>{element.description}</p>
                <button>{todos.completed == true ? "Completed" : "Mark as Complete"}</button>
            </div>
        })}
    </div>
}