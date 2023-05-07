import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Logger } from "~/utils/logger";

export const postRouter = createTRPCRouter({
  savePostEmpty: protectedProcedure.mutation(async ({ ctx }) => {
    const post = await ctx.prisma.post.create({
      data: {
        title: "未命名",
        content: "未命名",
        introduce: "未命名",
        is_release: false,
      },
      select: {
        id: true,
      },
    });
    return post;
  }),

  updatePost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        category: z.string(),
        introduce: z.string(),
        content: z.string(),
        is_release: z.boolean().default(false).optional(),
        id: z.string(),
        tags: z.array(z.string()).optional(),
        cover: z.object({
          url: z.string(),
          name: z.string(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const currentCategoryId = await ctx.prisma.category.findFirst({
        where: {
          name: input.category,
        },
        select: {
          id: true,
        },
      });

      Logger.getLogger("updatePost").info(
        "input.category =",
        input.category,
        "currentCategoryId = ",
        currentCategoryId
      );

      const postUpDate = await ctx.prisma.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          introduce: input.introduce,
          content: input.content,
          is_release: input.is_release,
          Category: {
            connect: {
              id: input.category,
            },
          },
          PostOnTag: {},
          cover: {
            create: {
              url: input.cover.url,
              name: input.cover.name,
            },
          },
        },
      });
      return postUpDate;
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
  postById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
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
    });
  }),
  getPostById: publicProcedure.input(z.string()).mutation(({ input, ctx }) => {
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
  allTags: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tag.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
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
