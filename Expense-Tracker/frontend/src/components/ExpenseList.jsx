import React from 'react'

const ExpenseList = ({ expenses }) => {
    return (
        <div className='mb-7'>
            <h1>Expense List</h1>
            {
                expenses.map((e, index) => (
                    <div key={index}>
                        <p>{e.title}</p>
                        <p>{e.amount}</p>
                        <p>{e.category}</p>
                        <p>Start: {new Date(e.start_date).toLocaleDateString('en-US')}</p>
                        <p>End: {new Date(e.end_date).toLocaleDateString('en-US')}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ExpenseList
