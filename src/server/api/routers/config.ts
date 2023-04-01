import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { z } from "zod";

export const configRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.config.findUnique({
      where: {
        id: env.BLOG_ID,
      },
      select: {
        blog_title: true,
        blog_introduce: true,
        slogan: true,
        socials: {
          select: {
            name: true,
            url: true,
            id: true,
          },
        },
      },
    });
  }),
  upSert: protectedProcedure
    .input(
      z.object({
        blog_title: z.string(),
        blog_introduce: z.string(),
        slogan: z.string(),
        socials: z
          .array(z.object({ name: z.string(), url: z.string() }))
          .optional()
          .default([]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const config = await ctx.prisma.config.findUnique({
        where: {
          id: env.BLOG_ID,
        },
      });
      if (config) {
        return ctx.prisma.config.update({
          where: {
            id: env.BLOG_ID,
          },
          data: {
            blog_title: input.blog_title,
            blog_introduce: input.blog_introduce,
            slogan: input.slogan,
            socials: {
              deleteMany: {
                name: {
                  in: input.socials.map((social) => social.name),
                },
              },
              createMany: {
                data: input.socials,
              },
            },
          },
        });
      }
      return ctx.prisma.config.create({
        data: {
          id: env.BLOG_ID,
          blog_title: input.blog_title,
          blog_introduce: input.blog_introduce,
          slogan: input.slogan,
          socials: {
            createMany: {
              data: input.socials,
            },
          },
        },
      });
    }),
});
