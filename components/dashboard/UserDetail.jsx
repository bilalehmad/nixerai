'use client';

import {useState} from 'react';
import UsersTable from './tables/UsersTable';


const UserDetail = ({data}) => {
  const [post, setPost] = useState(data)
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Role
                </th>
                <th scope="col" className="px-6 py-3">
                    Subscription
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {data.map((post) => (
      <UsersTable 
        key={post._id}
        post={post}
      />
      ))}
        </tbody>
    </table>
</div>

  )
}

export default UserDetail