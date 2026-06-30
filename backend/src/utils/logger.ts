const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const colors = {
  error: '\x1b[31m', // Red
  warn: '\x1b[33m',  // Yellow
  info: '\x1b[36m',  // Cyan
  debug: '\x1b[35m', // Magenta
  reset: '\x1b[0m',
};

const currentLevel = levels[process.env.LOG_LEVEL as keyof typeof levels] || levels.info;

export const logger = {
  error: (message: string, error?: any) => {
    if (currentLevel >= levels.error) {
      console.error(`${colors.error}[ERROR]${colors.reset} ${message}`, error);
    }
  },
  warn: (message: string) => {
    if (currentLevel >= levels.warn) {
      console.warn(`${colors.warn}[WARN]${colors.reset} ${message}`);
    }
  },
  info: (message: string) => {
    if (currentLevel >= levels.info) {
      console.log(`${colors.info}[INFO]${colors.reset} ${message}`);
    }
  },
  debug: (message: string, data?: any) => {
    if (currentLevel >= levels.debug) {
      console.log(`${colors.debug}[DEBUG]${colors.reset} ${message}`, data);
    }
  },
};
