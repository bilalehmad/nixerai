import Timestamp from '@components/others/Timestamp'
import React from 'react'
import { usePathname, useRouter } from "next/navigation";

const SubscriptionTable = ({post,onPageChange}) => {
    const pathName = usePathname();
    const router = useRouter();
    const handleEdit = () => {
        onPageChange(post._id);
    }
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
    
    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
        <img className="w-10 h-10 rounded-full" src={post.user.image} alt="Jese image" />
        <div className="pl-3">
            <div className="text-base font-semibold">{post.user.username}</div>
            <div className="font-normal text-gray-500">{post.user.email}</div>
        </div>  
    </th>
    <td className="px-6 py-4 capitalize">
    {post.package.title}
    </td>
    {/* <td className="px-6 py-4 capitalize">
    {post.package.detail}
    </td> */}
    <td className="px-6 py-4 capitalize">
    {post.package.duration}
    </td>
    <td className="px-6 py-4">
        <div className="flex items-center">
            {/* <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> */}
            <Timestamp date={post.expireAt} />
        </div>
    </td>
    
    {pathName !== '/profile/subscription' && (
        <td className="px-6 py-4">
            <button onClick={handleEdit}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
        </td>
    )}
</tr>
  )
}

export default SubscriptionTable