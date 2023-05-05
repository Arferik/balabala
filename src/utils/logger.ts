import { configure } from "log4js";
import { env } from "~/env.mjs";

interface LogConfig {
  path?: string;
  level?: string;
  name?: string;
  console?: boolean;
}
const getLogFilePath = (params: LogConfig) => {
  const { path, name } = params;
  return {
    run: `${path}/run/r${name}.log`,
    debug: `${path}/debug/${name}/d${name}.log`,
    interface: `${path}/interface/i${name}.log`,
  };
};

const getLoggerConfig = (params: LogConfig) => {
  const layout = {
    type: "pattern",
    pattern: "[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] [%c] - %m",
  };

  const interfaceLayout = {
    type: "pattern",
    pattern: "[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] - %m",
  };
  const logPathMaps = getLogFilePath(params);
  return {
    appenders: {
      console: {
        type: "console",
        layout: {
          type: "pattern",
          pattern: "%[[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] %c -%] %m",
        },
        level: "debug",
      },
      rApp: {
        type: "dateFile",
        filename: logPathMaps.run,
        pattern: "yyyy-MM-dd",
        maxLogSize: "10M",
        keepFileExt: true,
        compress: true,
        layout,
      },
      dApp: {
        type: "dateFile",
        filename: logPathMaps.debug,
        pattern: "yyyy-MM-dd",
        maxLogSize: "10M",
        keepFileExt: true,
        compress: true,
        layout,
      },
      interface: {
        type: "dateFile",
        filename: logPathMaps.interface,
        pattern: "yyyy-MM-dd",
        maxLogSize: "10M",
        keepFileExt: true,
        compress: true,
        interfaceLayout,
      },
      rAppLoggerFilter: {
        type: "logLevelFilter",
        appender: "rApp",
        level: "info",
      },
      dAppLoggerFilter: {
        type: "logLevelFilter",
        appender: "dApp",
        level: params.level === "debug" ? "debug" : "off",
      },
    },
    categories: {
      default: {
        appenders: params.console
          ? ["console", "rAppLoggerFilter", "dAppLoggerFilter"]
          : ["rAppLoggerFilter", "dAppLoggerFilter"],
        level: params.level || "info",
      },
      interface: {
        appenders: params.console ? ["console", "interface"] : ["interface"],
        level: "info",
      },
    },
  };
};

export const Logger = configure(
  getLoggerConfig({
    path: env.LOG_PATH,
    name: env.LOG_NAME,
    level: env.LOG_LEVEL,
    console: env.LOG_LEVEL === "debug",
  })
);
