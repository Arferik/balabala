import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  draft: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.post.findFirst({
      where: {
        id: input,
      },
    });
  }),
  getPostById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.post.findUnique({
      where: {
        id: input,
      },
    });
  }),
  post20Latest: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: {
        discoverable: true,
      },
      orderBy: {
        publish_date: "desc",
      },
      take: 20,
    });
  }),
  delPostById: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => {
      return ctx.prisma.post.delete({
        where: {
          id: input,
        },
      });
    }),
  pageList: protectedProcedure
    .input(
      z.object({
        number: z.number().default(1),
        size: z.number().default(20),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const posts = ctx.prisma.post.findMany({
        orderBy: {
          publish_date: "desc",
        },
        skip: (input.number - 1) * input.size,
        take: input.size,
      });
      const postCounts = ctx.prisma.post.count({});
      const [data, count] = await ctx.prisma.$transaction([posts, postCounts]);
      return {
        data,
        count,
        input,
      };
    }),
  savePostDraft: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        id: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      if (input.id) {
        return ctx.prisma.post.update({
          data: {
            title: input.title,
            content: input.content,
            discoverable: false,
          },
          where: {
            id: input.id,
          },
          select: {
            id: true,
          },
        });
      }
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          description: "",
        },
        select: {
          id: true,
        },
      });
    }),
});
