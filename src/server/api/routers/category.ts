import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  allCatagories: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });
  }),
  addCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.category.create({
        data: {
          name: input.name,
        },
      });
    }),
});
