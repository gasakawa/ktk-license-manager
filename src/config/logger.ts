import { resolve } from 'path';
import {
  Logger as WinstonLoger,
  createLogger,
  format,
  transports,
} from 'winston';

import { format as formatDate } from 'date-fns';

const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp}: ${message}`;
});

export default class Logger {
  private static _instance: Logger;
  private readonly _logger: WinstonLoger;
  private timestamp = formatDate(new Date(), 'yyyyMMdd_HHmmss');

  private constructor() {
    this._logger = createLogger({
      level: process.env.NODE_ENV === 'development' ? 'info' : 'error',
      format: format.combine(
        format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss',
        }),
        customFormat,
      ),
      transports: [
        new transports.Console({
          level: 'debug',
          format: format.json(),
        }),
        new transports.File({
          filename: resolve(
            __dirname,
            '..',
            '..',
            `logs/${this.timestamp}_error.log`,
          ),
          level: 'error',
        }),
        new transports.File({
          filename: resolve(
            __dirname,
            '..',
            '..',
            `logs/${this.timestamp}_info.log`,
          ),
          level: 'info',
        }),
      ],
    });
  }

  static getInstance(): Logger {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new Logger();
    return this._instance;
  }

  get log(): WinstonLoger {
    return this._logger;
  }
}
