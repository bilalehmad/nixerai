'use client';

import {useEffect, useState} from 'react';
import UsersTable from './tables/UsersTable';
import UserModal from './modal/UserModal';

const UserDetail = ({data}) => {
  const [post, setPost] = useState(data);
  const [validation, setValidation] = useState(false);
  const [formerror, setFormerror] = useState("");
  const [action, setAction] = useState("");
  const [modal, setModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [submitting, setsubmitting] = useState(false);
  const [editPost, setEditPost] = useState({
    username: "",
    email: "",
    role: "",
    image: "",
    subscriptionStatus: ""
  });


  const onPageChange = (id) => {
    setUserId(id)
    const checkId = isString(id);
    checkId ? setAction("Edit") : setAction("Add");
    
    setValidation(false)
    setFormerror("")
    setEditPost({
      username: "",
      email: "",
      role: "",
      image: "",
      subscriptionStatus: ""
    })
  
    setModal((prev) => !prev)
  };
  useEffect(() => {
    const checkId = isString(userId);
    const getPackageDetails = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setEditPost((prevState) => ({
        ...prevState,
          username: data.username,
          image: data.image,
          email: data.email,
          role: data.role,
          subscriptionStatus: data.subscriptionStatus
      }))
  
    }
    if(checkId) getPackageDetails();
  }, [userId])
  const updateUser = async (e) => {
    e.preventDefault();
    setValidation(false)
    setFormerror("")
    const checkId = isString(userId);

    if(editPost.role == '')
    {
      
      setValidation(true)
      setFormerror("Please Select the Role Dropdown")

    }
    else if(editPost.subscriptionStatus == '')
    {
      setValidation(true)
      setFormerror("Please Select the Subscription Dropdown")
    }
    else
    {
      
      setsubmitting(true);
      setValidation(false)
      setFormerror("")
      if(checkId)
      {
        try {
          const respose = await fetch(`/api/users/update`,{
              method :'PATCH',
              body : JSON.stringify({
                id: userId,
                role: editPost.role,
                subscriptionStatus: editPost.subscriptionStatus
              })
          })

          if (respose.ok) {
              setModal((prev) => !prev);
              const updatedValues = {
                _id: userId,
                username: editPost.username,
                image: editPost.image,
                email: editPost.email,
                role: editPost.role,
                subscriptionStatus: editPost.subscriptionStatus
              };

              // Usage
              const newState = post.map(obj => {
                // 👇️ if id equals 2, update country property
                if (obj._id === userId) {
                  return {...obj, ...updatedValues};
                }
          
                // 👇️ otherwise return the object as is
                return obj;
              });
              setPost(newState);
              

          }
      } catch (error) {
          console.log(error)
      }
      finally{
          setsubmitting(false)
      }
      
      
    }
  }
}
 
  function isString(data) {
    if (typeof data === 'string') {
      return true;
    } else if (typeof data === 'object') {
      return false;
    }
  }
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
        {post.map((post) => (
      <UsersTable 
        key={post._id}
        post={post}
        onPageChange={onPageChange}
      />
      ))}
        </tbody>
    </table>
    {modal && 
        <UserModal 
          type = {action}
          handleSubmit={updateUser}
          submitting={submitting}
          post={editPost}
          setModal={onPageChange}
          setPost={setEditPost}
          validation = {validation}
          formerror = {formerror}
          />
    }
</div>

  )
}

export default UserDetail