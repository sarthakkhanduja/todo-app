import React from 'react'
import { Draggable } from '@hello-pangea/dnd';

function Todo(props) {

  const id = props.id.toString();
  return (
    <Draggable draggableId={id} index={props.index}>
      {(provided) => (
        <div className='m-2 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 w-4/5' 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          ref={provided.innerRef}
        >
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{props.title}</h5>
          <p className="font-normal text-gray-600">{props.description}</p>
        </div>
      )}   
    </Draggable>
  )
}

export default Todo
