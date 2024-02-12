import { useState } from "react";
import Todo from "./Todo";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

export function ProjectHome(props) {
    const todos = [{
        id: 1,
        title: "Call parents",
        description: "They're in Jaipur, so only call during the night. They're in Jaipur, so only call during the night. They're in Jaipur, so only call during the night. They're in Jaipur, so only call during the night.",
    }, {
        id: 2,
        title: "Complete Cohort",
        description: "Work on videos from week 8",
    }, {
        id: 3,
        title: "Laundry",
        description: "Use the new machines in the room",
    }]

    const [yetToStartTodo, setYetToStartTodo] = useState(todos);
    const [inProgressTodo, setInProgressTodo] = useState([]);
    const [completedTodo, setCompletedTodo] = useState([]);

    const onDragEnd = (result) => {
        console.log("This is called");
        const { destination, source, draggableId } = result;
    
        if (!destination) {
            return;
        }
    
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
    
        // Determine source and destination column
        let sourceColumn, destinationColumn;
        if (source.droppableId === 'yetToStart') {
            sourceColumn = yetToStartTodo;
        } else if (source.droppableId === 'inProgress') {
            sourceColumn = inProgressTodo;
        } else if (source.droppableId === 'completed') {
            sourceColumn = completedTodo;
        }
    
        if (destination.droppableId === 'yetToStart') {
            destinationColumn = yetToStartTodo;
        } else if (destination.droppableId === 'inProgress') {
            destinationColumn = inProgressTodo;
        } else if (destination.droppableId === 'completed') {
            destinationColumn = completedTodo;
        }
    
        // Remove dragged item from source column
        const draggedItem = sourceColumn.splice(source.index, 1)[0];
    
        // Insert dragged item into destination column
        destinationColumn.splice(destination.index, 0, draggedItem);
    
        // Update state with new arrays
        setYetToStartTodo([...yetToStartTodo]);
        setInProgressTodo([...inProgressTodo]);
        setCompletedTodo([...completedTodo]);
    }
    

    return (
        <div className="h-screen">
            <div className="w-full px-16 py-8 text-6xl font-bold">
                {props.projectName}
            </div>
            <div className="px-16">
                <div className="w-full bg-gray-200 rounded-full">
                    <div className="bg-blue-marguerite-400 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: props.projectProgress}}>{props.projectProgress}</div>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="px-16 mt-2 grid grid-cols-3 py-3 gap-4 h-5/6">
                    <div className="col-span-1 bg-red-100 rounded-xl">
                        <div className="flex justify-center items-center h-8 border-b-2 border-blue-marguerite-300 font-bold">
                            Yet to Start
                        </div>
                        <Droppable droppableId="yetToStart">
                            {(provided) => (
                                <div className="flex flex-col p-4 justify-center items-center w-full" ref={provided.innerRef} {...provided.droppableProps}>
                                    {yetToStartTodo.map((todo, index) => (
                                        <Todo key={todo.id} id={todo.id} title={todo.title} description={todo.description} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className="col-span-1 bg-yellow-100 rounded-xl">
                        <div className="flex justify-center items-center h-8 border-b-2 border-blue-marguerite-300 font-bold">
                            In Progress
                        </div>
                        <Droppable droppableId="inProgress">
                            {(provided) => (
                                <div className="flex flex-col p-4 justify-center items-center w-full" ref={provided.innerRef} {...provided.droppableProps}>
                                    {inProgressTodo.map((todo, index) => (
                                        <Todo key={todo.id} id={todo.id} title={todo.title} description={todo.description} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className="col-span-1 bg-green-100 rounded-xl">
                        <div className="flex justify-center items-center h-8 border-b-2 border-blue-marguerite-300 font-bold">
                            Completed
                        </div>
                        <Droppable droppableId="completed">
                            {(provided) => (
                                <div className="flex flex-col p-4 justify-center items-center w-full" ref={provided.innerRef} {...provided.droppableProps}>
                                    {completedTodo.map((todo, index) => (
                                        <Todo key={todo.id} id={todo.id} title={todo.title} description={todo.description} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}
