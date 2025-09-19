import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = ({ expenses }) => {

    if(expenses.length === 0){
        return <p>No expenses to display</p>
    }
    const chartData = {
        labels: expenses.map((e) => e.title),
        datasets: [
            {
                label: "Amount",
                data: expenses.map((e) => e.amount),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                ],
                borderColor: "#fff",
                borderWidth: 1,
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
        <div style={{ width: "400px", margin: "0 auto" }}>
            <Pie data={chartData} options={chartOptions} />
        </div>
    )
}

export default ExpensePieChart