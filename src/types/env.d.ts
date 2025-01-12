declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AMPLITUDE_API_KEY: string;
      AMPLITUDE_API_SECRET: string;
    }
  }
}

export {};
