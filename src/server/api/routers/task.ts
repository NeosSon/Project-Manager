import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc"; // Adjust the import as needed

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        projectId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }: any) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          createdBy: { connect: { id: ctx.session.user.id } },
          project: { connect: { id: input.projectId } }, // Link the task to the project
        },
      });
    }),

  getTasks: protectedProcedure
    .input(
      z.object({ projectId: z.number() }), // Accept projectId as input
    )
    .query(({ ctx, input }: any) => {
      return ctx.db.task.findMany({
        where: { projectId: input.projectId }, // Filter tasks by projectId
      });
    }),
    deleteTask: 
    protectedProcedure
    .input(
      z.object({ taskId: z.number() }), // Accept taskId as input
    )
    .mutation(({ ctx, input }: any) => {
      return ctx.db.task.delete({
        where: { id: input.taskId }, // Delete task by taskId
      });
    }),
    
});
