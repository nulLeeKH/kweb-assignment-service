#!/usr/bin/.env node

import App from './app'
import logger from './util/logger'

import { config as envConfig } from 'dotenv'
envConfig()

const port: number = Number(process.env.SERVICE_PORT) || 3000
export const { app } = new App()
app
  .listen(port, () => logger.info(`Server is listening at ${port}`))
  .on('error', (error: string) => logger.error(error))
