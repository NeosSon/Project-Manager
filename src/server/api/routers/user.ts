import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "../../../server/api/trpc";

export const userRouter = createTRPCRouter({
    getInfo: protectedProcedure.query(({ ctx }) => {
        return {
            user: ctx.session.user,
            image: ctx.session.user.image
        };
    }),
})