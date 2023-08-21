"use client";
import {useState} from 'react'

function SummaryCard({data}) {
    const [price, setPrice] = useState(data)
  return (
    <>
    <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-100 dark:bg-gray-800 space-y-6">
    <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
      
    {price.map((item,index) => (
      <div className="flex justify-start w-full">
        
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#0ACE82"><path d="M8.99978 17.9992C8.99878 17.9992 8.99778 17.9992 8.99578 17.9992C8.72878 17.9982 8.47477 17.8913 8.28777 17.7013L4.28778 13.6393C3.89978 13.2453 3.90478 12.6123 4.29878 12.2253C4.69278 11.8383 5.32478 11.8422 5.71278 12.2362L9.00577 15.5802L18.2938 6.29325C18.6848 5.90225 19.3168 5.90225 19.7078 6.29325C20.0988 6.68325 20.0988 7.31725 19.7078 7.70725L9.70777 17.7073C9.51977 17.8943 9.26478 17.9992 8.99978 17.9992Z" fill="currentColor"></path></svg>

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