"use client";
import React, { useState } from 'react'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import { title } from 'process';
const CreateProject = () => {
  const router = useRouter()
  const [project, setproject] = useState({ title: '', description: '' })
  const [isLoading, setIsLoading] = useState(false)
  const createProject = api.project.create.useMutation({
    onMutate: () => {
      setIsLoading(true)
    },

    onSuccess: () => {

      router.refresh()
      setproject({ title: '', description: '' })
      console.log('Project created')
      setIsLoading(false)
    },
    onError: (error) => {
      console.log(error)
    },
    
  })
  
  return (
    <div className='flex flex-col bg-gradient-to-t from-white to-slate-300 w-60 rounded-2xl mx-auto p-8 relative mt-[20%]'>
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create a new project</h1>
        <form className="flex flex-col space-y-4 " onSubmit={(e) => {
          e.preventDefault();
          createProject.mutate(project);
        }}>
        <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input value={project.title} onChange={(event) => setproject({...project, title: event.target.value})} type="text" name="title" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea value={project.description} onChange={(e) => setproject({...project, description: e.target.value})} name="description" id="description" cols={30} rows={10} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
        </div>
        <button disabled={isLoading} type="submit" className={!isLoading ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline stretch ": "bg-slate-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline stretch"} >{!isLoading ? "Create Project" : "Submitting..."}</button>
        </form>
       
    </div>
  )
}

export default CreateProject