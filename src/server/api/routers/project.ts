import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";


export const projectRouter = createTRPCRouter({
    create: protectedProcedure.input(z.object({ title: z.string().min(1), description: z.string().min(1) })).mutation(async ({ ctx, input }) => {
        // simulate a slow db call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return ctx.db.project.create({
            data: {
                title: input.title,
                description: input.description,
                createdBy: { connect: { id: ctx.session.user.id } },
            },
        });
    }),
    getLatest: protectedProcedure.query(({ ctx }) => {
        return ctx.db.project.findFirst({
            orderBy: { createdAt: "desc" },
            where: { createdBy: { id: ctx.session.user.id } },
        });
    }),
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.db.project.findMany({
            where: { createdBy: { id: ctx.session.user.id } },
        });
    }),
    deleteProject: protectedProcedure.input(z.object({ projectId: z.number() })).mutation(({ ctx, input }) => {
        return ctx.db.project.delete({
            where: { id: input.projectId },
        });
    }),
})