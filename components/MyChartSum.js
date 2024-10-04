import { useState, useEffect } from "react";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Summation Price group by types",
    },
  },
};

export async function getData() {
    const res = await fetch('http://localhost:3000/api/pets/sum')

    if(!res.ok){
        throw new Error('Faild to fetch data')
    }
    return res.json()
    
}

export default function MyChartSum() {
    const [data, setData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Pets',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }      
        ],
      });
    
      useEffect(()=>{
        async function fetchData() {
            const jsonData = await getData()
            setData({
                labels: jsonData ? jsonData.map(item => item.animal): [],
                datasets: [
                  {
                    label: 'Price of pets',
                    data: jsonData ? jsonData.map(item => item.sumPrice) : [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(150, 20, 255, 0.5)',
                  }      
                ],
              })
        }
    
        fetchData()
      },[])
    
    
      return (
        <div>
          <h4>Vertical bar chart showing price by type</h4>
          <Bar options={options} data={data} />
        </div>
      );
}
