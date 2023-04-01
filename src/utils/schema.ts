import { z } from "zod";

export const ConfigSchema = z
  .object({
    blog_title: z
      .string()
      .min(3, {
        message: "至少3个字符",
      })
      .max(20, {
        message: "不能超过20个字符",
      }),
    slogan: z
      .string()
      .min(6, {
        message: "至少6个字符",
      })
      .max(20, {
        message: "不能超过20个字符",
      }),
    blog_introduce: z
      .string()
      .min(6, {
        message: "至少6个字符",
      })
      .max(200, {
        message: "不能超过200个字符",
      }),
    socials: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, {
              message: "至少1个字符",
            })
            .max(10, {
              message: "不能超过10个字符",
            }),
          url: z.string().url({
            message: "必须为地址",
          }),
        })
      )
      .optional()
      .default([]),
  })
  .required();
