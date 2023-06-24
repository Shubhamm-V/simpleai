// Declaring types for .env variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      DATABASE: string;
      DATABASE_LOCAL: string;
      DATABASE_PASSWORD: string;
      JWT_SECERET: string;
      JWT_EXPIRE: string;
      JWT_EXPIRE_IN: string;
    }
  }
}

export {};
