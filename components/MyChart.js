import { useState, useEffect } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Prices by date",
    },
  },
};

export async function getData() {
    const res = await fetch('http://localhost:3000/api/pets')

    if(!res.ok){
        throw new Error('Faild to fetch data')
    }
    return res.json()
    
}

export default function MyChart() {
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
                labels: jsonData ? jsonData.map(item => item.date.split('T')[0]): [],
                datasets: [
                  {
                    label: 'Pets',
                    data: jsonData ? jsonData.map(item => item.price) : [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  }      
                ],
              })
        }
    
        fetchData()
      },[])
    
    
      return (
        <div>
          <h4 >Line chart showing price by date</h4>
          <Line options={options} data={data} />
        </div>
      );
}
