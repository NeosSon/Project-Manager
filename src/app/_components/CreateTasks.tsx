"use client";

import { db } from '@/server/db';
import { api } from '@/trpc/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';


const CreateTasks = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lineThrough, setLineThrough] = useState(false);
  const [task, setTask] = useState({ title: '', description: '' });
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const projects = api.project.getAll.useQuery();
  const tasks = api.task.getTasks.useQuery({ projectId: Number(selectedProjectId) });
  const createTask = api.task.create.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      router.refresh();
      window.location.reload();
      setTask({ title: '', description: '' });
      setIsLoading(false);
    },
  });
  const deleteTask = api.task.deleteTask.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      window.location.reload();
      router.refresh();
      setIsLoading(false);
    },
  });
  return (
    <div className='flex flex-col justify-center items-center gap-y-4'>
      <form
        className='text-slate-950'
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedProjectId) {
            createTask.mutate({
              title: task.title,
              description: task.description,
              projectId: Number(selectedProjectId),
            });
          }
        }}
      >
        <select
          name="projects"
          id="projects"
          className='text-slate-950 p-2 ml-5'
          onChange={(e) => setSelectedProjectId(e.target.value)}
        >
          <option value="">Select a project</option>
          {projects.data?.map((project) => (
            <option key={project.id} value={project.id}>{project.title}</option>
          ))}
        </select>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
          className='bg-white text-slate-950 p-2 rounded-lg ml-8'
        >
          Add Task +
        </button>
        {menuOpen && (
          <div className='flex flex-col w-48 p-4 gap-4'>
            <input
              type="text"
              placeholder='Title'
              className='rounded-lg p-2'
              value={task.title}
              onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))}
            />
            <textarea
              rows={10}
              cols={30}
              placeholder='Description'
              className='rounded-lg p-2'
              value={task.description}
              onChange={(e) => setTask((prev) => ({ ...prev, description: e.target.value }))}
            />
            <button
              type="submit"
              className={!isLoading ? 'bg-white text-slate-950 p-2 rounded-lg' : 'bg-slate-600 text-slate-950 p-2 rounded-lg'}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Create Task'}
            </button>
          </div>
        )}
      </form>
      
      {!isLoading && tasks.data?.map((task: any) => (
        !isLoading ? <div key={task.id} className={lineThrough ? ' text-wrap bg-white p-4 rounded-lg text-slate-950 line-through w-full' : 'bg-white p-4 rounded-lg text-slate-950 w-full text-wrap'}>
          <h1>Title: {task.title}</h1>
          <p>Description: {task.description}</p>
          <p>Project Id: {task.projectId}</p>
          <input type="checkbox" name="task" value={task.id} onClick={() => setLineThrough(prev => !prev)} />
          <button
            onClick={(e) => {e.preventDefault();  deleteTask.mutate({ taskId: task.id })}}
            className='bg-slate-600 text-slate-100  mr-2 ml-2 p-2 rounded-lg hover:min-w-24'
          >Delete Task</button>
    </div> : <div>Loading...</div>
  ))}

    </div>
  );
}

export default CreateTasks;
