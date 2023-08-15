"use client";
import {useState} from 'react'

function SummaryCard({data}) {
    const [price, setPrice] = useState(data)
  return (
    <>
    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
      
    {price.map((item,index) => (
      <div className="flex justify-start w-full">
        
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
        <span className="px-2 text-base dark:text-gray-300 leading-4 text-gray-600">{item}</span>
      </div>
      ))}
      {/* <div className="flex justify-between items-center w-full">
        <p className="text-base dark:text-white leading-4 text-gray-800">Discount <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">STUDENT</span></p>
        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">-$28.00 (50%)</p>
      </div>
      <div className="flex justify-between items-center w-full">
        <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">$8.00</p>
      </div> */}
    </div>
    {/* <div className="flex justify-between items-center w-full">
      <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
      <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">$36.00</p>
    </div> */}
  </div>

    </>
  )
}

export default SummaryCard