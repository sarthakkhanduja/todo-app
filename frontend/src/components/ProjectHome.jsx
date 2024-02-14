import { useState, useCallback } from "react";
import axios from "axios";
import Todo from "./Todo";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import ToDoModal from "./ToDoModal";
import { useEffect } from "react";

export function ProjectHome(props) {
    const [todos, setTodos] = useState([]);
    const [toDoModal, setToDoModal] = useState(false); // To-do Modal
    const [toDoTitle, setToDoTitle] = useState(""); // This is for the Modal (To-Do Modal)
    const [toDoDescription, setToDoDescription] = useState("") // This is for the Modal (To-Do Modal)
    const [yetToStartTodo, setYetToStartTodo] = useState([]);
    const [inProgressTodo, setInProgressTodo] = useState([]);
    const [completedTodo, setCompletedTodo] = useState([]);
    const [todosLoading, setTodosLoading] = useState(false);

    const toggleToDoModal = useCallback(() => {
        setToDoModal(!toDoModal);
    }, [toDoModal]);

    const fetchTodo = useCallback(async () => {
        // console.log("GET Todos called!");
        // console.log(props.currentProject._id);
    
        const safeToken = localStorage.getItem('token');
        // console.log(safeToken);
        // console.log(typeof safeToken);
    
        try {
            const response = await axios.get('http://localhost:3001/todos', {
                params: {
                    projectId: props.currentProject._id,
                },
                headers: {
                    "Authorization": safeToken,
                }
            });
    
            console.log(response.data.todos);
            setTodos(response.data.todos);
        } catch(e) {
            console.error("Error fetching Todos:", e);
        }
    }, [props.currentProject, toDoModal]);

    const addTodo = useCallback(async () => {

        try {
            let safeToken = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/todo', {
                title: toDoTitle,
                description: toDoDescription,
                projectId: props.currentProject._id,
            }, {
                headers: {
                    "Authorization": `${safeToken}`
                }
            });

            alert("Todo Created");
            setToDoTitle("");
            setToDoModal(false);
        } catch(e) {
            console.error("Error adding ToDo:", e);
        }
    }, [fetchTodo, props.currentProject, toDoDescription, toDoTitle]);


    useEffect(() => {
        fetchTodo();
    }, [props.currentProject, toDoModal]);

    useEffect(() => {
        const ytsTodos = todos.filter((todo) => {
            return todo.status === "Yet to Start";
        });
        console.log(ytsTodos);
        
        const ipTodos = todos.filter((todo) => {
            return todo.status === "In Progress";
        });
        
        const cTodos = todos.filter((todo) => {
            return todo.status === "Completed";
        });

        setYetToStartTodo(ytsTodos);
        setInProgressTodo(ipTodos);
        setCompletedTodo(cTodos);
    }, [todos, props.currentProject]);
    
    const columnMapping = {
        "yetToStart": "Yet to Start",
        "inProgress": "In Progress",
        "completed": "Completed"
    }

    const updateTodoStatus = async (id, status) => {
        try {
            let safeToken = localStorage.getItem('token');
            const response = await axios.put('http://localhost:3001/updateStatus', {
                id: id,
                status: status
            }, {
                headers: {
                    "Authorization": `${safeToken}`
                }
            });

        } catch (error) {
            console.error("Error updating todo status:", error);
        }
    };

    const onDragEnd = async (result) => {
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
    
        const draggedItem = sourceColumn.find(todo => todo._id === draggableId);
        const newSourceColumn = sourceColumn.filter(todo => todo._id !== draggableId);
    
        if (source.droppableId === destination.droppableId) {
            const reorderedItems = Array.from(sourceColumn);
            const [removedItem] = reorderedItems.splice(source.index, 1);
            reorderedItems.splice(destination.index, 0, removedItem);
    
            if (source.droppableId === 'yetToStart') {
                setYetToStartTodo(reorderedItems);
            } else if (source.droppableId === 'inProgress') {
                setInProgressTodo(reorderedItems);
            } else if (source.droppableId === 'completed') {
                setCompletedTodo(reorderedItems);
            }
        } else {
            // If the source and destination columns are different, remove the item from the source column and add it to the destination column
            const newDestinationColumn = Array.from(destinationColumn);
            newDestinationColumn.splice(destination.index, 0, draggedItem);
            if (source.droppableId === 'yetToStart') {
                setYetToStartTodo([...newSourceColumn]);
                setInProgressTodo([...newDestinationColumn]);
                setCompletedTodo([...newDestinationColumn]);
            } else if (source.droppableId === 'inProgress') {
                setYetToStartTodo([...newDestinationColumn]);
                setInProgressTodo([...newSourceColumn]);
                setCompletedTodo([...newDestinationColumn]);
            } else if (source.droppableId === 'completed') {
                setYetToStartTodo([...newDestinationColumn]);
                setInProgressTodo([...newDestinationColumn]);
                setCompletedTodo([...newSourceColumn]);
            }
            // Show loading state
            setTodosLoading(true);
        
            // Update todo status
            await updateTodoStatus(draggedItem._id, columnMapping[destination.droppableId]);
        
            // Fetch updated todo list
            await fetchTodo();

            props.setUpdated(true);
            // Hide loading state
            setTodosLoading(false);
        }
    };

    return (
        <div className="h-screen opacity-90">
            <ToDoModal 
                setToDoTitle={setToDoTitle} 
                toDoTitle={toDoTitle} 
                toDoModal={toDoModal} 
                setToDoModal={setToDoModal} 
                setToDoDescription={setToDoDescription} 
                toDoDescription={toDoDescription}
                toggle={toggleToDoModal}
                addTodo={addTodo}
            />
            <div className="w-full px-16 py-8 flex justify-between items-center">
                <p className="text-6xl font-bold">{props.currentProject.title}</p>
                <Button label="Add To-do" toggle={toggleToDoModal} />
            </div>
            <div className="px-16">
                <div className="w-full bg-gray-200 rounded-full">
                    <div className="bg-blue-marguerite-400 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: `${props.currentProject.progress}%`}}>{props.currentProject.progress}</div>
                </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="px-16 mt-2 grid grid-cols-3 py-3 gap-4 h-5/6">
                    <div className="col-span-1 bg-red-200 rounded-xl overflow-auto red-scrollbar">
                        <div className="flex justify-center items-center h-8 border-b-2 border-blue-marguerite-300 font-bold">
                            Yet to Start
                        </div>
                        {todosLoading ? <div className="h-full w-full flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-300 -50 800 800"><rect fill="#FF0F53" stroke="#FF0F53" stroke-width="3" width="30" height="30" x="25" y="85"><animate attributeName="opacity" calcMode="spline" dur="1.8" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill="#FF0F53" stroke="#FF0F53" stroke-width="3" width="30" height="30" x="85" y="85"><animate attributeName="opacity" calcMode="spline" dur="1.8" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill="#FF0F53" stroke="#FF0F53" stroke-width="3" width="30" height="30" x="145" y="85"><animate attributeName="opacity" calcMode="spline" dur="1.8" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect></svg>
                                        </div> : <Droppable droppableId="yetToStart">
                                                            {(provided) => (
                                                                <div className="flex flex-col p-4 justify-center items-center w-full" ref={provided.innerRef} {...provided.droppableProps}>
                                                                    {yetToStartTodo.map((todo, index) => (
                                                                        todo.status == "Yet to Start" ? <Todo key={todo._id} id={todo._id} title={todo.title} description={todo.description} index={index} /> : ""
                                                                    ))}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>}
                        
                    </div>
                    <div className="col-span-1 bg-yellow-200 rounded-xl overflow-auto yellow-scrollbar">
                        <div className="flex justify-center items-center h-8 border-b-2 border-blue-marguerite-300 font-bold">
                            In Progress
                        </div>
                        {todosLoading ? <div className="h-full w-full flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-300 -50 800 800"><rect fill="#FFCD0B" stroke="#FFCD0B" stroke-width="3" width="30" height="30" x="25" y="85"><animate attributeName="opacity" calcMode="spline" dur="1.8" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill="#FFCD0B" stroke="#FFCD0B" stroke-width="3" width="30" height="30" x="85" y="85"><animate attributeName="opacity" calcMode="spline" dur="1.8" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill="#FFCD0B" stroke="#FFCD0B" stroke-width="3" width="30" height="30" x="145" y="85"><animate attributeName="opacity" calcMode="spline" dur="1.8" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect></svg>
                                        </div> : <Droppable droppableId="inProgress">
                                                            {(provided) => (
                                                                <div className="flex flex-col p-4 justify-center items-center w-full" ref={provided.innerRef} {...provided.droppableProps}>
                                                                    {inProgressTodo.map((todo, index) => (
                                                                        todo.status == "In Progress" ? <Todo key={todo._id} id={todo._id} title={todo.title} description={todo.description} index={index} /> : ""
                                                                    ))}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>}
                        
                    </div>
                    <div className="col-span-1 bg-green-200 rounded-xl overflow-auto green-scrollbar">
                        <div className="flex justify-center items-center h-8 border-b-2 border-blue-marguerite-300 font-bold">
                            Completed
                        </div>
                        {todosLoading ? <div className="h-full w-full flex justify-center items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-300 -50 800 800"><rect fill="#06FF36" stroke="#06FF36" stroke-width="3" width="30" height="30" x="25" y="85"><animate attributeName="opacity" calcMode="spline" dur="1.8" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill="#06FF36" stroke="#06FF36" stroke-width="3" width="30" height="30" x="85" y="85"><animate attributeName="opacity" calcMode="spline" dur="1.8" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill="#06FF36" stroke="#06FF36" stroke-width="3" width="30" height="30" x="145" y="85"><animate attributeName="opacity" calcMode="spline" dur="1.8" values="1;0;1;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect></svg>
                                        </div> : <Droppable droppableId="completed">
                                                            {(provided) => (
                                                                <div className="flex flex-col p-4 justify-center items-center w-full" ref={provided.innerRef} {...provided.droppableProps}>
                                                                    {completedTodo.map((todo, index) => (
                                                                        todo.status == "Completed" ? <Todo key={todo._id} id={todo._id} title={todo.title} description={todo.description} index={index} /> : ""
                                                                    ))}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>}
                        
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
}

function Button(props) {
    return (
        <button 
            className="cursor-pointer relative inline-flex items-center pr-12 pl-10 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
            onClick={props.toggle}
        >
            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-5 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">{props.label}</span>
        </button>
    );
}
