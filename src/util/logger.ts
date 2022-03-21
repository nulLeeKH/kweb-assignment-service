import { transports, createLogger, format } from 'winston'
import TransportStream = require('winston-transport')
import 'winston-daily-rotate-file'

import { config as envConfig } from 'dotenv'

envConfig()

const tps: TransportStream[] = [
  new transports.Console({
    level: process.env.LOG_LEVEL,
    format: format.combine(
      format.label({ label: `[${process.env.SERVICE_NAME}]` }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.colorize(),
      format.printf((info: TransformableInfo) => `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`)
    )
  })
]

if ('' != process.env.LOG_PATH && undefined != process.env.LOG_PATH) {
  tps.push(
    new transports.DailyRotateFile({
      filename: `${process.env.LOG_PATH}/${process.env.SERVICE_NAME}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '32m',
      maxFiles: '31d'
    })
  )
}

interface TransformableInfo {
  level: string
  message: string

  [key: string]: any
}

const logger = createLogger({
  transports: tps
})

export default logger

export function loggedController(domainName: string, functionName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      return original.apply(this, args).then((result: any) => {
        logger.info(
          `controller(${domainName}:${functionName}) - args=${JSON.stringify(args)} | result=${JSON.stringify(result)}`
        )
        return result
      })
    }
  }
}

export function loggedRouter(domainName: string, functionName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      return original.apply(this, args).then((result: any) => {
        logger.info(
          `router(${domainName}:${functionName}) - body=${JSON.stringify(args[0].body)} | query=${JSON.stringify(
            args[0].query
          )} | result=${JSON.stringify(result)}`
        )
        return result
      })
    }
  }
}

export function loggedInitializer(type: string, domainName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      const result = original.apply(this, args)
      if ('object' == typeof result) {
        result.then((result: string) => {
          logger.info(`${type}(${domainName}:initialize) - error=${result}`)
        })
      } else {
        logger.info(`${type}(${domainName}:initialize) - error=${result}`)
      }

      return result
    }
  }
}
