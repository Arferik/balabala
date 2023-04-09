import { prisma } from "./../../db";
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

  infinitePosts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.date().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.post.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { created_at: cursor } : undefined,
        orderBy: {
          created_at: "asc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.created_at;
      }
      return {
        items,
        nextCursor,
      };
    }),
  getPostById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.post.findUnique({
      where: {
        id: input,
      },
      select: {
        title: true,
        id: true,
        release_date: true,
        introduce: true,
        content: true,
        cover: {
          select: {
            url: true,
            name: true,
          },
        },
      },
    });
  }),
  post20Latest: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      select: {
        title: true,
        id: true,
        release_date: true,
        introduce: true,
        cover: {
          select: {
            url: true,
            name: true,
          },
        },
        PostOnTag: {
          select: {
            tag: {
              select: {
                name: true,
                icon: true,
              },
            },
          },
        },
      },
      where: {
        is_release: true,
      },
      orderBy: {
        release_date: "desc",
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
            is_release: false,
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
          introduce: "",
        },
        select: {
          id: true,
        },
      });
    }),
});
