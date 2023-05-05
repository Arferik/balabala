import { type Prisma, PrismaClient } from "@prisma/client";
import { Logger as l } from "~/utils/logger";
import { env } from "~/env.mjs";
import { type Logger, type Log4js } from "log4js";

class DBService extends PrismaClient<
  Prisma.PrismaClientOptions,
  "query" | "error"
> {
  private log: Logger;
  private logList: string[] = [];
  private logListFlag = false;

  constructor(private readonly logger: Log4js) {
    super({
      log: [{ emit: "event", level: "query" }],
      errorFormat: "colorless",
    });
    this.log = this.logger.getLogger(DBService.name);

    this.$use(async (params, next) => {
      const { action, args } = params;
      if (action === "update") {
        const { data } = args || {};
        data.updatedAt = new Date().toISOString();
      }
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      this.log.info(
        `[prisma:query] ${params.model}.${params.action} took ${
          after - before
        }ms`
      );
      return result;
    });
    this.$on("query", (e) => {
      const { query } = e;
      this.makeBatchLogger(query);
    });
  }
  makeBatchLogger(query: string) {
    if (query === "BEGIN") {
      this.logList = [];
      this.logListFlag = true;
    }
    if (!this.logListFlag) {
      this.log.debug("[prisma:query]  ", query);
    } else {
      this.logList.push(query);
    }
    if (query === "COMMIT") {
      this.logListFlag = false;
      this.log.debug("[prisma:query]", this.logList);
    }
  }
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new DBService(l);

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
