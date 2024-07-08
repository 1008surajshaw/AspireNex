import React, { useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../common/Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../base/SelectList";
import Button from "../common/Button";
import Upload from "./Upload";
import { useSelector } from "react-redux";
import { createTask } from "../../services/operations/taskAPI";

const LISTS = ["todo", "in progress", "completed"];
const PRIORITY = ["high", "medium", "normal", "low"];

const AddTask = ({ open, setOpen }) => {
  const { token } = useSelector((state) => state.auth);
  const task = "";
  const { 
    register, 
    handleSubmit, 
    setValue,
    formState: { errors },
    reset
  } = useForm();

  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toLowerCase() || LISTS[0]);
  const [priority, setPriority] = useState(task?.priority?.toLowerCase() || PRIORITY[2]);
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = async (formdata) => {
    const data = {
      ...formdata,
      priority,
      stage,
      team: JSON.stringify(team),
    };
    console.log(data);
    try {
      const resp = await createTask(data, token);
      reset();
      setTeam([]);
      setStage(LISTS[0]);
      setPriority(PRIORITY[2]);
      
    } catch (error) {
      console.error('Error creating task:', error);
    }
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)} className="pt-36">
          <Dialog.Title as='h2' className='text-base font-bold leading-6 text-gray-900 mb-4'>
            {task ? "UPDATE TASK" : "ADD TASK"}
          </Dialog.Title>

          <div className=' flex flex-col gap-4'>
            <div className="flex flex-col">
              <Textbox
                placeholder='Task Title'
                type='text'
                name='title'
                label='Task Title'
                className='w-full rounded'
                register={register("title", { required: "Title is required" })}
                error={errors.title ? errors.title.message : ""}
              />
              <Textbox
                placeholder='Describe Task'
                type='text'
                name='description'
                label='Task description'
                className='w-full rounded'
                register={register("description", { required: "Description is required" })}
                error={errors.description ? errors.description.message : ""}
              />
            </div>

            <UserList setTeam={setTeam} team={team} />

            <div className='flex gap-4'>
              <SelectList
                label='Task Stage'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />
              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='dueDate'
                  label='Task Date'
                  className='w-full rounded'
                  register={register("dueDate", { required: "Date is required!" })}
                  error={errors.dueDate ? errors.dueDate.message : ""}
                />
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <SelectList
                label='Priority Level'
                lists={PRIORITY}
                selected={priority}
                setSelected={setPriority}
              />
              <Upload
                name="assignImage"
                label="Any supporting Images"
                register={register}
                setValue={setValue}
                errors={errors}
              />
            </div>

            <div className='bg-gray-50 py-4 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-500'>
                  Uploading assets
                </span>
              ) : (
                <Button
                  label='Submit'
                  type='submit'
                  className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto'
                />
              )}

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
