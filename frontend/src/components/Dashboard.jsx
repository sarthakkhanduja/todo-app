import React from 'react'
import BarChart from './BarChart'
import { useState } from 'react'
import PieChart from './PieChart'

function Dashboard() {
    const data = [
        {
            "_id": "65cd1455ea574d3343bcf8b8",
            "title": "Something",
            "description": "",
            "status": "Completed",
            "user": "65c1e071743f980fd67f0611",
            "project": "65cb0b2e2f17cdecbbd3c84b",
            "createdAt": "2024-02-14T19:28:21.037Z",
            "__v": 0
        },
        {
            "_id": "65cd14a8ea574d3343bcf8de",
            "title": "New Todo",
            "description": "This is a heading. This is a heading. This is a heading. This is a heading.This is a heading.This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading.This is a heading. This is a heading. This is a heading. This is a heading.This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading.",
            "status": "In Progress",
            "user": "65c1e071743f980fd67f0611",
            "project": "65cb0b2e2f17cdecbbd3c84b",
            "createdAt": "2024-02-14T19:29:44.099Z",
            "__v": 0
        },
        {
            "_id": "65cd14b3ea574d3343bcf8e9",
            "title": "Good Todo",
            "description": "This is a heading. This is a heading. This is a heading. This is a heading.This is a heading.This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading.This is a heading. This is a heading. This is a heading. This is a heading.This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading.",
            "status": "Yet to Start",
            "user": "65c1e071743f980fd67f0611",
            "project": "65cb0b2e2f17cdecbbd3c84b",
            "createdAt": "2024-02-14T19:29:55.777Z",
            "__v": 0
        },
        {
            "_id": "65cd14beea574d3343bcf8f4",
            "title": "Bad Todo",
            "description": "This is a heading. This is a heading. This is a heading. This is a heading.This is a heading.This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading.This is a heading. This is a heading. This is a heading. This is a heading.This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading. This is a heading.",
            "status": "Completed",
            "user": "65c1e071743f980fd67f0611",
            "project": "65cb0b2e2f17cdecbbd3c84b",
            "createdAt": "2024-02-14T19:30:06.455Z",
            "__v": 0
        }
    ]
    
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
        </div>
    </div>
  )
}

export default Dashboard