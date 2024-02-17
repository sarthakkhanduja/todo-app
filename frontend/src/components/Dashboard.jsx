import React from 'react'
import BarChart from './BarChart'
import { useState } from 'react'
import PieChart from './PieChart'
import { useEffect } from 'react'

function Dashboard() {
    const data = [
        {
            "_id": "65c5f59fb7058a842efc40c1",
            "title": "New Todo Title",
            "description": "Description of the new todo",
            "status": "Completed",
            "user": "65c1e071743f980fd67f0611",
            "project": "65c5da0f86dbc271cf1b8b8e",
            "createdAt": "2024-02-09T09:51:27.327Z",
            "__v": 0,
            "completedAt": "2024-02-10T01:50:32.231Z"
        },
        {
            "_id": "65c5f5bfb7058a842efc40c7",
            "title": "New Todo Title 2",
            "description": "Description of the new todo 2",
            "status": "Completed",
            "user": "65c1e071743f980fd67f0611",
            "project": "65c5da0f86dbc271cf1b8b8e",
            "createdAt": "2024-02-09T09:51:59.662Z",
            "__v": 0,
            "completedAt": "2024-02-17T01:50:32.231Z"
        },
        {
            "_id": "65cffa101f527ae781724a08",
            "title": "Test Todo",
            "description": "This is to test the completedAt part of the DB",
            "status": "In Progress",
            "user": "65c1e071743f980fd67f0611",
            "project": "65c5da0f86dbc271cf1b8b8e",
            "completedAt": null,
            "createdAt": "2024-02-17T00:13:04.674Z",
            "__v": 0
        },
        {
            "_id": "65d010f410830cc93f8250b9",
            "title": "What to do",
            "description": "I don't know",
            "status": "Completed",
            "user": "65c1e071743f980fd67f0611",
            "project": "65c5da0f86dbc271cf1b8b8e",
            "completedAt": "2024-02-17T01:51:02.165Z",
            "createdAt": "2024-02-17T01:50:44.051Z",
            "__v": 0
        },
        {
            "_id": "65d0110310830cc93f8250c4",
            "title": "How to do",
            "description": "I thought you'd know",
            "status": "Yet to Start",
            "user": "65c1e071743f980fd67f0611",
            "project": "65c5da0f86dbc271cf1b8b8e",
            "completedAt": null,
            "createdAt": "2024-02-17T01:50:59.031Z",
            "__v": 0
        }
    ]

    function calculateAverageCompletionTime(projectData) {
        let totalCompletedTodos = 0;
        let totalTime = 0;
      
        projectData.forEach(todo => {
          if (todo.status === 'Completed' && todo.completedAt) {
            const createdAt = new Date(todo.createdAt);
            const completedAt = new Date(todo.completedAt);
            const timeDifference = completedAt - createdAt; // Difference in milliseconds
            
            totalTime += timeDifference;
            totalCompletedTodos++;
          }
        });
      
        if (totalCompletedTodos === 0) {
          return 0; // No completed todos, return 0
        }
      
        const averageTime = totalTime / totalCompletedTodos; // Average time in milliseconds
        const hours = Math.floor(averageTime / (1000 * 60 * 60));
        const minutes = Math.floor((averageTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((averageTime % (1000 * 60)) / 1000);
      
        return { hours, minutes, seconds };
    }

    const [averageCompletionTime, setAverageCompletionTime] = useState(0);

    useEffect(() => {
        const avgTime = calculateAverageCompletionTime(data);
        setAverageCompletionTime(avgTime);
    }, []);
      
    
    const getStatusData = (obj) => {
        let ans = {};
        
        for(let i = 0; i < obj.length; i++) {
            if(obj[i].status in ans){
                ans[obj[i].status] += 1;
            }
            else {
                ans[obj[i].status] = 1;
            }
        }
        return ans;
    }
    const statusData = getStatusData(data);

    const [barData, setBarData] = useState({
        labels: Object.keys(statusData),
        datasets: [{
            label: "Tasks",
            data: Object.values(statusData),
            backgroundColor: Object.keys(statusData).map(status => {
                switch (status) {
                    case 'Completed':
                        return 'rgba(0, 128, 0, 0.5)'; 
                    case 'In Progress':
                        return 'rgba(255, 255, 0, 0.5)'; 
                    case 'Yet to Start':
                        return 'rgba(255, 0, 0, 0.5)'; 
                    default:
                        return 'rgba(169, 169, 169, 0.5)'; 
                }
            }),
            barThickness: '50'
        }],
    });


    
    return (
        <div className='main-outer-div'>
            <div className='w-[500px]'>
                <BarChart chartData={barData} />
                <PieChart data={barData} />
                <NumberTile title="Average Task Completion Time" value={`${averageCompletionTime.hours} Hours ${averageCompletionTime.minutes} Mins`} /> 
            </div>
        </div>
    );
}

function NumberTile(props) {
    return(
        <div className='w-44 h-36 flex flex-col'>
            <div className='p-2'>
                <p className='font-semibold text-xl'>{props.title}</p>
            </div>
            <div className='flex justify-center items-center'>
                <p className='font-semibold text-xl'>{props.value}</p>
            </div>
            
        </div>
    )
}

export default Dashboard