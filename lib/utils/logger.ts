import winston from 'winston';

/**
 * Enterprise-grade Logger
 * Winston統合で構造化ログを実現
 */
export class Logger {
  private logger: winston.Logger;
  private context: string;

  constructor(context: string = 'App') {
    this.context = context;

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      defaultMeta: { service: 'playwright-qa', context: this.context },
      transports: [
        // コンソール出力（カラフル）
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, context, ...meta }) => {
              const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
              return `${timestamp} [${context}] ${level}: ${message} ${metaStr}`;
            })
          )
        }),
        // ファイル出力（エラーのみ）
        new winston.transports.File({ 
          filename: 'logs/error.log', 
          level: 'error',
          maxsize: 5242880, // 5MB
          maxFiles: 5,
        }),
        // ファイル出力（全ログ）
        new winston.transports.File({ 
          filename: 'logs/combined.log',
          maxsize: 5242880,
          maxFiles: 5,
        })
      ]
    });
  }

  info(message: string, meta?: object): void {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: object): void {
    this.logger.warn(message, meta);
  }

  error(message: string, error?: Error | object): void {
    if (error instanceof Error) {
      this.logger.error(message, { 
        error: error.message, 
        stack: error.stack 
      });
    } else {
      this.logger.error(message, error);
    }
  }

  debug(message: string, meta?: object): void {
    this.logger.debug(message, meta);
  }

  /**
   * テスト開始ログ
   */
  testStart(testName: string): void {
    this.logger.info(`🚀 Test Started: ${testName}`);
  }

  /**
   * テスト成功ログ
   */
  testPass(testName: string): void {
    this.logger.info(`✅ Test Passed: ${testName}`);
  }

  /**
   * テスト失敗ログ
   */
  testFail(testName: string, error: Error): void {
    this.logger.error(`❌ Test Failed: ${testName}`, {
      error: error.message,
      stack: error.stack
    });
  }

  /**
   * APIリクエストログ
   */
  apiRequest(method: string, url: string, status?: number): void {
    this.logger.info(`API ${method} ${url}`, { status });
  }

  /**
   * パフォーマンスログ
   */
  performance(action: string, duration: number): void {
    this.logger.info(`⏱️  ${action}: ${duration}ms`);
  }
}
