import React from 'react'

function Todo(props) {
  return (
    <div className='m-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 w-4/5'>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{props.title}</h5>
        <p className="font-normal text-gray-600">{props.description}</p>
    </div>
  )
}

export default Todo