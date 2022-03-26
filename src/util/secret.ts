import * as randToken from 'rand-token'
// import axios from 'axios'
import logger from './logger'
import { config as envConfig } from 'dotenv'
envConfig()

// const jwtUser = ['https://test.api.pos.toany.app/pos/auth/keybox']

export class secret {
  public jwt: string = ''

  constructor() {
    this.jwt = randToken.uid(128)
    logger.info(`jwt_secret: ${this.jwt}`)
    // if ('true' == process.env.JWT_SERVE) {
    //   this.jwt = randToken.uid(128)
    //   logger.info(`jwt_secret: ${this.jwt}`)
    //   this.serveJwt()
    // }
  }

  // serveJwt() {
  //   const data = JSON.stringify({
  //     jwt_secret: this.jwt
  //   })
  //
  //   function serveSecret(target: string): boolean {
  //     axios
  //       .post(target, data)
  //       .then(res => {
  //         logger.info(`Secret served to ${target} ${res.status}`)
  //       })
  //       .catch(e => {
  //         logger.warn(`Secret serve failed to ${target}`)
  //         logger.warn(e.stack)
  //       })
  //     return true
  //   }
  //
  //   jwtUser.every(serveSecret)
  // }
  //
  // updateJwt(newSecret: string) {
  //   this.jwt = newSecret
  // }
}

export default new secret()
