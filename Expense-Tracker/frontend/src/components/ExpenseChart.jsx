import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useFetchExpenses } from '../hooks'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = () => {
    const { expenses } = useFetchExpenses()
    
    const chartData = {
        labels: expenses.map((e) => e.title),
        datasets: [
            {
                label: "Amount",
                data: expenses.map((e) => e.amount),
                backgroundColor: "rgba(75, 192, 192, 0.5)"
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        plugins: {
            legend:{
                display: true
            },
            title: {
                display: true,
                text: "Expenses Overview"
            }
        }
        
    }

     return (
        <div style={{ width: "600px", margin: "0 auto" }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
     )
}

export default ExpenseChart