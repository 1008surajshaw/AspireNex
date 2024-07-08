import { MdAdminPanelSettings } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import clsx from "clsx";
import { Chart } from "../components/chart/Chart";
import TaskTable from "../components/dashboard/TaskTable";
import UserTable from "../components/dashboard/UserTable";
import { getDashboardData } from "../services/operations/taskAPI";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [dashData, setDashData] = useState();

  const getDashBoardData = async () => {
    try {
      const res = await getDashboardData(token);
      setDashData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getDashBoardData();
    }
  }, [token]);

  console.log(dashData);
  const totals = dashData?.alltasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: dashData?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals?.completed || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals?.["in progress"] || 0, // Use bracket notation for "in progress"
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals?.todo || 0, // Add default value 0 if undefined
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm text-gray-400">{"110 last month"}</span>
        </div>
        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };

  if (!dashData) {
    return <Loading />;
  }

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold">Chart by Priority</h4>
        <Chart chartData={dashData.graphData} />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* /left */}
        <TaskTable tasks={dashData?.last10Task} />
        {/* /right */}
       {user?.isAdmin && <UserTable users={dashData?.users} /> } 
      </div>
    </div>
  );
};

export default Dashboard;
