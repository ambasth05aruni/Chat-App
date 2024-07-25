import React from 'react'
import {Line, Doughnut} from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, Tooltip, Filler,LinearScale, PointElement
    ,LineElement, ArcElement, Legend,
    scales
  } from 'chart.js'

 import { getLast7days } from '../../lib/features';

ChartJS.register(
    CategoryScale,
Tooltip,
Filler,
LinearScale,
PointElement,
LineElement,
ArcElement,
Legend
);
const labels = getLast7days()

const lineChartOptions = {
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
    },
}, 
scales:{
    x:{
        grid: {
        display:false,
        },
    },
    y:{
        beginAtZero:true,
        grid: {
            display:false,
            },
    },
},
}

const LineChart = ({value=[]}) => {
    const data ={
        labels,
        datasets:[{
            label: "Sales",
            data:value,
            fill:false,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
        
        },
        {
            label: "Revenue",
            data:[1, 3, 2, 2, 4, 1, 2],
            fill:true,
            backgroundColor: "rgba(75,182,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
        }
    ]
    }

  return (
   <Line data={data} options={lineChartOptions}/>
  )
};

const doughnutChartOptions ={
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
        }
    }
}







const DoughnutChart = ({value =[], labels=[]}) => {
    const data ={
        labels,
        datasets:[
            {
                label: "Totals Chats vs Group Chats",
                data:value,
                fill:true,
                backgroundColor: ["#f44336", "#2196f3", "#ffeb3b", "#4caf50", "#ff9800", "#795548", "#9c27b0"],
                hoverBackgroundColor:"rgba(75,192,192,1)",
                borderColor: "rgba(75,192,192,1)",
                offset:40,
            
            
            }
        ]
    }
    return (
     <Doughnut style={{
zIndex:10

     }} data={data} options={doughnutChartOptions}/>
    )
  }

export {LineChart, DoughnutChart}