"use client"
import { db } from '@/server/db'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page =  () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const projects =   api.project.getAll.useQuery().data
    const deleteProject = api.project.deleteProject.useMutation({
        onMutate: () => {
            setIsLoading(true)
        },
        onSuccess: () => {
            router.refresh()
            window.location.reload();
            setIsLoading(false)
        }
    })
  return (
    <div>
        <h2 className='text-2xl text-center'>Projects</h2>
        <div >
            {projects?.map(project => (
                <div key={project.id} className='flex flex-col p-8 justify-center items-center'>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <button disabled={isLoading} className={!isLoading ? 'bg-black rounded-lg p-2 hover:bg-white hover:text-slate-950' : 'bg-slate-600 rounded-lg p-2 '  } onClick={() => deleteProject.mutate({projectId: project.id})}>{isLoading ? "Deleting...": "Delete"}</button>
                </div>
            ))}

        </div>
    </div>
  )
}

export default page