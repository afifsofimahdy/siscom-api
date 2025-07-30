import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { join } from 'path';
import { AppLoggerService } from './logger.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        // Console transport untuk development
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`,
            ),
          ),
        }),
        // File transport untuk menyimpan log ke file
        new winston.transports.File({
          dirname: join(process.cwd(), 'storage', 'logs'),
          filename: 'application.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
          maxsize: 10 * 1024 * 1024, // 10MB
          maxFiles: 5,
        }),
      ],
    }),
  ],
  providers: [AppLoggerService],
  exports: [WinstonModule, AppLoggerService],
})
export class LoggerModule {}