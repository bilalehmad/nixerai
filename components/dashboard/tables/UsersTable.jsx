import React from 'react'

const UsersTable = ({post,onPageChange}) => {
    const handleEdit = () => {
        onPageChange(post._id);
    }
  return (
    
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    
    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <img className="w-10 h-10 rounded-full" src={post.image} alt="Jese image" />
        <div className="pl-3">
            <div className="text-base font-semibold">{post.username}</div>
            <div className="font-normal text-gray-500">{post.email}</div>
        </div>  
    </th>
    <td className="px-6 py-4 capitalize">
        {post.role}
    </td>
    <td className="px-6 py-4">
        <div className="flex items-center">
            {/* <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> */}
            {post.subscriptionStatus} 
        </div>
    </td>
    <td className="px-6 py-4">
        <button onClick={handleEdit} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
    </td>
</tr>
  )
}

export default UsersTable