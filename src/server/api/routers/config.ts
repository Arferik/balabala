import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const configRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({});
    if (users.length > 1) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "用户大于1个",
        cause: console.trace(users),
      });
    }
    if (users.length === 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "请先设置用户",
        cause: console.trace(users),
      });
    }
    return ctx.prisma.config.findFirst({
      where: {
        userId: users[0]?.id,
      },
      select: {
        blog_introduce: true,
        blog_title: true,
        slogan: true,
        socials: {
          select: {
            name: true,
            url: true,
            icon: true,
            id: true,
          },
        },
      },
    });
  }),
});
