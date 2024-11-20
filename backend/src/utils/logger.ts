// logger.ts
import winston from "winston";

const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    colorize({
      all: true, colors: {
        info: 'green',
        error: 'red',
      }
    }),
    timestamp(), errors({ stack: true }), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "application.log" }),
  ],
});
winston.addColors({
  info: 'green',
  error: 'red'
})
export default logger;
