import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './router'
import errorHandler from './middleware/errorHandler'
import logger, { loggedInitializer } from './util/logger'
import { refreshAllRepo } from './repository'

import { config as envConfig } from 'dotenv'
envConfig()

class App {
  public app: express.Application

  constructor() {
    this.initDatabaseConnection()

    this.app = express()
    this.app.use(errorHandler)
    this.initMiddlewares()
    this.initRouter()
  }

  @loggedInitializer('app', 'db')
  private initDatabaseConnection() {
    return createConnection({
      type: 'mariadb',
      charset: 'utf8mb4_general_ci',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['src/domain/**.ts', 'dist/domain/**.js']
    })
      .then(() => {
        refreshAllRepo()
        return ''
      })
      .catch(e => {
        logger.error(e.stack)
        return e.stack
      })
  }

  @loggedInitializer('app', 'router')
  private initRouter() {
    try {
      const router: express.Router = express.Router()
      routes.forEach(route => {
        this.app.use(`${process.env.SERVICE_ROUTE}${route.basePath}`, route.router)
      })
      this.app.use(router)
      this.app.get(`${process.env.SERVICE_ROUTE}`, (req: any, res: any) => {
        res.send('server is working >..<')
      })
      return ''
    } catch (e: any) {
      return e.stack
    }
  }

  @loggedInitializer('app', 'middleware')
  private initMiddlewares() {
    try {
      this.app.use(cors())
      this.app.use(bodyParser.json())
      this.app.use(bodyParser.urlencoded({ extended: true }))
      return ''
    } catch (e: any) {
      return e.stack
    }
  }
}

export default App
