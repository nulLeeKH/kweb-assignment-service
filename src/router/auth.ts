import { Request, Response } from 'express'
import authController from '../controller/auth'
import {
  ITypeSignUpReqBody,
  ITypeSignUpResBody,
  ITypeSignInReqBody,
  ITypeSignInResBody,
  ITypeRefreshReqBody,
  ITypeRefreshResBody
} from '../type/auth'
import controller from '../class/controller'
import { loggedRouter, loggedInitializer } from '../util/logger'

class PUController extends controller {
  public basePath = '/auth'

  constructor() {
    super()
    this.initializeRoutes()
  }

  @loggedInitializer('router', 'auth')
  private initializeRoutes() {
    try {
      this.router.post('/su', this.suRoute)
      this.router.post('/si', this.siRoute)
      this.router.post('/rf', this.rfRoute)
      return ''
    } catch (e: any) {
      return e.stack
    }
  }

  @loggedRouter('auth', 'su')
  private async suRoute(req: Request<undefined, undefined, ITypeSignUpReqBody, undefined>, res: Response) {
    const result: ITypeSignUpResBody | string = await authController.suController(req.body)
    if (result == 'err') {
      res.status(500).json()
      return [500, {}]
    } else {
      res.json(result)
      return [200, result]
    }
  }

  @loggedRouter('auth', 'si')
  private async siRoute(req: Request<undefined, undefined, ITypeSignInReqBody, undefined>, res: Response) {
    const result: ITypeSignInResBody | string = await authController.siController(req.body)
    if (result == 'err') {
      res.status(500).json()
      return [500, {}]
    } else {
      res.json(result)
      return [200, result]
    }
  }

  @loggedRouter('auth', 'rf')
  private async rfRoute(req: Request<undefined, undefined, ITypeRefreshReqBody, undefined>, res: Response) {
    const result: ITypeRefreshResBody | string = await authController.rfController(req.body)
    if (result == 'err') {
      res.status(500).json()
      return [500, {}]
    } else {
      res.json(result)
      return [200, result]
    }
  }
}

export default PUController
