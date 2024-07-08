import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/common/Loading";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/base/Tabs";
import TaskTitle from "../components/task/TaskTitle";
import BoardView from "../components/base/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { getAllTasks } from "../services/operations/taskAPI";
import { useSelector } from "react-redux";
import  { getUserAssignedTask } from "../services/operations/taskAPI"

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile)
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  
  const status = params?.status || "";
  console.log(user.isAdmin);
  const getAllTask = async () => {
    setLoading(true);
    let res = null; // Initialize res as null
    try {
      console.log("one");
      if (user.isAdmin === true) {
        console.log("1");
        res = await getAllTasks(token);
      } else {
        console.log("2");
        res = await getUserAssignedTask(token);
      }
      setTasks(res); 
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      getAllTask();
    }
  }, [token]);


  const filteredTasks = tasks.filter(task => !status || task.stage === status);

  return loading ? (
    <div className='py-10'>
      <Loading />
    </div>
  ) : (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-4'>
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && user.isAdmin && (
          <Button
            onClick={() => setOpen(true)}
            label='Create Task'
            icon={<IoMdAdd className='text-lg' />}
            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className='w-full flex justify-between gap-4 md:gap-x-12 py-4'>
            <TaskTitle label='To Do' className={TASK_TYPE.todo} />
            <TaskTitle
              label='In Progress'
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label='Completed' className={TASK_TYPE.completed} />
          </div>
        )}
        {
          filteredTasks.length >= 1 ? (
            selected !== 1 ? (
              <BoardView tasks={filteredTasks} />
            ) : (
              <div className='w-full'>
                <Table tasks={filteredTasks} />
              </div>
            )
          ) : (
            <div className='text-gray-500'>
              No tasks to display
            </div>
          )
        }
      </Tabs>
  
     {user.isAdmin && (
      <AddTask open={open} setOpen={setOpen} />
     )} 
     
    </div>
  );
};

export default Tasks;
