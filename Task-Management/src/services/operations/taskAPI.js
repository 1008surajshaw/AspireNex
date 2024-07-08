import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector"
const BASE_URL =process.env.REACT_APP_BASE_URL

export const getAllTasks = async (token) => {
    try {
      const response = await apiConnector("GET", BASE_URL+"/task/get",
        null,
        {
            Authorization: `${token}`
        }
    );
      return response.data.tasks;
    } catch (error) {
      console.log(error);
    }
  };
  
export const getAllUser = async (token) =>{
  try{
    console.log(token);
     const response = await apiConnector("GET", BASE_URL+"/auth/get-team",
      null,
      {
          Authorization: `${token}`
      }
    );
     return response.data;
  }catch(error){
     console.log(error);
  }
}


export const createTask = async (data,token) =>{
  try{
      console.log(data)
      const res = await apiConnector("POST",BASE_URL+"/task/create",data,
      {
        "Content-Type": "multipart/form-data",
         Authorization: `${token}`,
     })
     console.log(
      "MARK_TASK_AS_COMPLETE_API API RESPONSE............",
      res
    )
     toast.success("Task created and assigned");
  }catch(error){

  }
}


export const getTargetedTask = async(id,token) =>{
  try{
    const res = await apiConnector("GET", `${BASE_URL}/task/target/${id}`,null,
      {
        Authorization: `${token}`
    }
    )
    return res.data.task;
  }catch(error){
     console.log(error)
  }
}

export const postTaskActivity = async(id,data,token) =>{
  try{
      console.log(id);
      console.log(data);
      console.log(token);
     const res = await apiConnector("POST",BASE_URL+`/task/activity/${id}`,data,{
      Authorization: `${token}`
     })
     console.log(res);
     toast.success("added successfully");
  }catch(error){
      console.log(error);
      toast.error(error);

  }
}

// export const getUserAssignedTask = async(token) =>{
//     try{
//       const res = await apiConnector("GET",BASE_URL+"/get-user-assignedtask",null,
//         {
//           Authorization: `${token}`
//          }
//       )
//       console.log(res);
//       return res;
//     }
//     catch(error){
//       console.log(error);
//     }
// }


export const getUserAssignedTask = async (token) => {

  try {
    console.log("onr");
    const res = await apiConnector(
      'GET',
      BASE_URL + '/task/getassignedtask',
      null,
      {
        Authorization: ` ${token}`,
      }
    );
    console.log(res.data.tasks);
    return res.data.tasks;
  } catch (error) {
    console.log(error);
  }
};


export const getDashboardData = async (token) =>{
  try{
     const res = await apiConnector(
      "GET",
      BASE_URL + '/task/dashboard',null,
      {
        Authorization: ` ${token}`,
      }
     )
     return res.data;
  }catch(error){
     console.log(error);
  }
}

export const addSubTasks = async (id,info,token) =>{
  try{
    console.log(info);
    const res = await apiConnector("PUT",BASE_URL+`/task/create-subtask/${id}`,info,
      {
        Authorization: ` ${token}`,
      } 
    )
    console.log(res);
    toast.success("subTask added successfully")
  }catch(error){
    console.log(error);
    toast.error("subTask not added ")
  }
}

export const getUserNotificationList = async (token) =>{
  try{
    const response = await apiConnector("GET",BASE_URL+"/auth/notifications",null,
      {
        Authorization: ` ${token}`,
      } 
    )
    console.log(response);
    return response.data
  }catch(error){
      console.log(error);
  }
}

export const markUserNotification = async (token) => {
  try{
     
  }
  catch(error){
  
  }
}