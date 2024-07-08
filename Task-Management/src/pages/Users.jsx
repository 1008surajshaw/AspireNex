import React, { useEffect, useState } from "react";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import { IoMdAdd } from "react-icons/io";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/common/ConfirmatioDialog";
import AddUser from "../components/users/addUsers/AddUsers";
import { useSelector } from "react-redux";
import { getAllUser } from "../services/operations/taskAPI";
const Users = () => {
  const {token} = useSelector((state)=>state.auth)
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const [user,setUser] = useState();
  const userActionHandler = () => {};
  const deleteHandler = () => {};

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };
  const getAllUsers = async () =>{
    setLoading(true);
    try{
      const res = await getAllUser(token);
      setUser(res);
    } catch(error){
      console.log(error);
    }
  }
  useEffect(() =>{
    if(token){
      getAllUsers();
    }
  },[token]);
  console.log(user);
  const TableHeader = () => (
    <thead className='border-b border-gray-300'>
      <tr className='text-black text-left'>
        <th className='py-2'>User Name</th>
        <th className='py-2'>Title</th>
        <th className='py-2'>Email</th>
        <th className='py-2'>Role</th>
        <th className='py-2'>Active</th>
      </tr>
    </thead>
  );

  const TableRow = ({ users }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
      <td className='p-2'>
      <div className='flex items-center gap-3'>
        <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
          <img src={users.image} alt={users.username} className='w-full h-full object-cover rounded-full' />
        </div>
        {users.username}
      </div>
    </td>

      <td className='p-2'>{users.title}</td>
      <td className='p-2'>{users.email || "user.email.com"}</td>
      <td className='p-2'>{users.role}</td>

      <td>
        <button
          // onClick={() => userStatusClick(user)}
          className={clsx(
            "w-fit px-4 py-1 rounded-full",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>

      <td className='p-2 flex gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
          label='Edit'
          type='button'
          onClick={() => editClick(user)}
        />

        <Button
          className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
          label='Delete'
          type='button'
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:px-1 px-0 mb-6'>
        <div className='flex items-center justify-between mb-8'>
          <Title title='  Team Members' />
          <Button
            label='Add New User'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5'
            onClick={() => setOpen(true)}
          />
        </div>

        <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
          <div className='overflow-x-auto'>
            <table className='w-full mb-5'>
              <TableHeader />
              <tbody>
                {user?.map((users, index) => (
                  <TableRow key={index} users={users} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
     
      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;
