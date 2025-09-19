import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExpenseChart = ( {expenses }) => {
    
    if(expenses.length === 0){
        return <p>No expenses to display</p>
    }
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
        <div style={{ width: "500px", margin: "0 auto" }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    )
}

export default ExpenseChart