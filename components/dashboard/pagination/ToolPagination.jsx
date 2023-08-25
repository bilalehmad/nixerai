'use client';
import React, {useState, useEffect } from 'react'

const ToolPagination = ({ currentPage, setCurrentPage,totalItems,toPage,pages }) => {
  return (
    <ul className="inline-flex -space-x-px text-sm h-8">
    <li>
        <button type="button" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1} 
        className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
        Previous
        </button>
    </li>
    {pages && pages.map((page) => (
         <li
            className='cursor-pointer'
           key={page} >
           <a 
            className={`flex items-center justify-center px-3 h-8 border border-gray-300 dark:border-gray-700 ${page === currentPage ? "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700 dark:text-white" : "bg-white leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}`}
            onClick={() => setCurrentPage(page)}
            >
             {page}
           </a>
         </li>
       ))}
    <li>
        <button 
        type="button"
        onClick={() => setCurrentPage(prev => prev + 1)} 
        disabled={toPage === totalItems}
        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
        Next
        </button>
    </li>
</ul>
  )
}

export default ToolPagination