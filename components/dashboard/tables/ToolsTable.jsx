import React from 'react'

const ToolsTable = ({key,post,onPageChange,setPromptId}) => {
    const handleEdit = () => {
        onPageChange();
        setPromptId(post._id)
    }
  return (
    <tr key={key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    {/* <td class="w-4 p-4">
        <div class="flex items-center">
            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
        </div>
    </td> */}
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {post.title}
    </th>
    <td class="px-6 py-4">
        {post.description}
    </td>
    <td class="px-6 py-4">
    Waiting..
    </td>
    <td class="px-6 py-4">
    {post.status}
    </td>
    <td class="px-6 py-4">
    {post.tag}
    </td>
    <td class="px-6 py-4">
        <button onClick={handleEdit} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
    </td>
</tr>
  )
}

export default ToolsTable