declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVICE_PORT:number
      SERVICE_ROUTE:string
      ITERATION:number
      ACCESS_TOKEN_LIFE:number
      REFRESH_TOKEN_LIFE:number
      JWT_ISSUER:string
      DB_AES_KEY:string
      DB_AES_IV:string
      DB_HOST:string
      DB_PORT:number
      DB_USERNAME:string
      DB_PASSWORD:string
      DB_DATABASE:string
      LOG_PATH:string
      LOG_LEVEL:string
      TZ:string

    }
  }
}

export {}

