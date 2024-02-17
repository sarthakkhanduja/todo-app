import React from 'react'
import BarChart from './BarChart'
import { useState } from 'react'
import PieChart from './PieChart'
import { useEffect } from 'react'

function Dashboard(props) {
    const [averageCompletionTime, setAverageCompletionTime] = useState(0);

    function calculateAverageCompletionTime(projectData) {
        let totalCompletedTodos = 0;
        let totalTimeInMilliseconds = 0;
    
        projectData.forEach(todo => {
            if ((todo.status === 'Completed' && todo.completedAt) && (todo.completedAt !== todo.inProgressAt)) {
                const inProgressAt = new Date(todo.inProgressAt);
                const completedAt = new Date(todo.completedAt);
                const timeDifference = completedAt - inProgressAt; // Difference in milliseconds
    
                totalTimeInMilliseconds += timeDifference;
                totalCompletedTodos++;
            }
        });
    
        if (totalCompletedTodos === 0) {
            return { days: '-', hours: '-', mins: '-' }; // No completed todos, return 0 days and 0 hours
        }
    
        const averageTimeInMilliseconds = totalTimeInMilliseconds / totalCompletedTodos; // Average time in milliseconds
    
        const days = Math.floor(averageTimeInMilliseconds / (1000 * 60 * 60 * 24));
        const remainingHoursInMilliseconds = averageTimeInMilliseconds % (1000 * 60 * 60 * 24);
        const hours = Math.floor(remainingHoursInMilliseconds / (1000 * 60 * 60));
        const remainingMinsInMilliseconds = averageTimeInMilliseconds % (1000 * 60 * 60);
        const mins = Math.floor(remainingMinsInMilliseconds / (1000 * 60));
    
        return { days, hours, mins };
    }
    

    

    useEffect(() => {
        const avgTime = calculateAverageCompletionTime(props.todos);
        setAverageCompletionTime(avgTime);
        console.log(averageCompletionTime);
        console.log(typeof averageCompletionTime);
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
    const statusData = getStatusData(props.todos);

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
        <div className='w-7/8 bg-gray-50 h-3/4 mt-4 mx-8 rounded-2xl px-8 shadow-[rgba(0,_0,_0,_0.3)_0px_30px_90px] grid grid-cols-3 gap-4'>
            <div className='h-2/3 col-span-1 '>
                <PieChart data={barData} />
            </div>
            <div className='h-1/4 grid grid-cols-2'>
                <div className='col-span-2 grid grid-cols-2 gap-4 p-4 bg-red-100'>
                    <div className='col-span-1 p-2 bg-jade-200/70 rounded-xl flex flex-col'>
                        <div className='h-1/2 flex flex-row justify-between'>
                            <p className='font-semibold text-lg'>Average Completion Time</p>
                            <div className='pt-1'>
                                <svg className="h-6 w-6 text-blue-marguerite-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="12" y1="16" x2="12" y2="12" />  <line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                            </div>
                        </div>
                        <div className='flex flex-col h-1/2 justify-center'>
                            <p className='font-bold text-4xl'>{`${averageCompletionTime.days}d ${averageCompletionTime.hours}h ${averageCompletionTime.mins}m`}</p>
                        </div>
                    </div>
                    <div className='col-span-1 p-2 rounded-xl bg-blue-100'>
                        Something
                    </div>
                </div>
            </div>

            {/* <div className='w-full flex flex-row'>
                <div className="barChart">
                    <BarChart chartData={barData} />
                </div>
                <div className="pieChart">
                    <PieChart data={barData} />
                </div>
                <div className="tile">
                    <NumberTile title="Average Task Completion Time" value={`${averageCompletionTime.hours} Hours ${averageCompletionTime.minutes} Mins`} /> 
                </div>
            </div> */}
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