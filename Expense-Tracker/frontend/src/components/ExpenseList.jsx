import React from 'react'

const ExpenseList = ({ expenses }) => {
    return (
        <div className='mb-7 w-full px-10 mt-[-30px]'>
            {/* <h1 className='text-center'>Expense List</h1> */}
            <table className='w-full p-10 mx-auto text-left border'>
                <thead className='p-3 bg-[#00df9a] text-white font-bold tracking-wider'>
                    <tr className='text-center'>
                        <th className='py-1'>Title</th>
                        <th className='py-1'>Amount</th>
                        <th className='py-1'>Category</th>
                        <th className='py-1'>Start Date</th>
                        <th className='py-1'>End Date</th>
                    </tr>
                </thead>
                <tbody className='border'>
                    {expenses.map((e, index) => (
                        <tr key={index} className='border'>
                            <td className='px-4 py-1 font-light border'>{e.title}</td>
                            <td className='px-4 py-1 font-light border'>{e.amount}</td>
                            <td className='px-4 py-1 font-light border' >{e.category}</td>
                            <td className='px-4 py-1 font-light border'>{new Date(e.start_date).toLocaleDateString('en-US')}</td>
                            <td className='px-4 py-1 font-light border'>{new Date(e.end_date).toLocaleDateString('en-US')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseList
