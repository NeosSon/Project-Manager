import { db } from '@/server/db'
import Link from 'next/link'
import React from 'react'
import CreateTasks from '../_components/CreateTasks'
import { api } from '@/trpc/react'
import { useRouter } from 'next/navigation'

const ProjectsPage = async () => {
        
        const projects =  await db.project.findMany()
        console.log(projects)
      return (
        <div>
            <div>
                <h2 className='text-center text-2xl'>Tasks</h2>
                <CreateTasks />
            </div>
        </div>
      )
}

export default ProjectsPage