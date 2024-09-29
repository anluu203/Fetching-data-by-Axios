import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './userSlice';
import { AppDispatch, RootState } from '../Redux/store';
import { deleteUser } from './userSlice';


const UserList: React.FC = () => {
 
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users.users )
  const status = useSelector((state: RootState) => state.users.status)
  
  useEffect( () => {
    dispatch(fetchUsers());
  },[dispatch])

  const handleDelete = (userId: number) => {
    dispatch(deleteUser(userId)); // Dispatch action với userId
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      {status === 'loading' && 
      <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8 text-center me-2 
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 
        50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 
        9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 
        4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 
        10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 
        88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
          Loading...
      </button>}
      {status === 'succeeded' && (
        <>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <li key={user.id} className="relative border p-4 rounded-lg shadow-md">
            <button type="button" className="absolute px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 
            rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 
            dark:hover:bg-blue-700 dark:focus:ring-blue-800 right-2"
            onClick={() => handleDelete(user.id)}
            >Delete</button>
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mb-2"
            />
            
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
        </>
      )}
      {status === 'failed' && 
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <span className="font-medium">Error!</span> Not fetching users data.
      </div>
      }
    </div>
  );
};

export default UserList;
