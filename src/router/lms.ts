import { Request, Response } from 'express'
import lmsController from '../controller/lms'
import {
  ITypeBoardAddReqBody,
  ITypeBoardAddReqQuery,
  ITypeBoardDetailReqQuery,
  ITypeBoardDetailResBody,
  ITypeBoardListReqQuery,
  ITypeBoardListResBody,
  ITypeEnrolAddReqQuery,
  ITypeLectureAddReqBody,
  ITypeLectureListReqQuery,
  ITypeLectureListResBody
} from '../type/lms'
import controller from '../class/controller'
import { JwtPayload } from 'jsonwebtoken'
import { loggedRouter, loggedInitializer } from '../util/logger'
import { verify } from '../util/jwt'

class LmsController extends controller {
  public basePath = '/lms'

  constructor() {
    super()
    this.initializeRoutes()
  }

  @loggedInitializer('router', 'lms')
  private initializeRoutes() {
    try {
      this.router.post('/lecture/add', this.laRoute)
      this.router.get('/lecture/list', this.llRoute)
      this.router.get('/enrol/add', this.eaRoute)
      this.router.post('/board/add', this.baRoute)
      this.router.get('/board/list', this.blRoute)
      this.router.get('/board/detail', this.bdRoute)
      return ''
    } catch (e: any) {
      return e.stack
    }
  }

  @loggedRouter('lms', 'la')
  private async laRoute(req: Request<undefined, undefined, ITypeLectureAddReqBody, undefined>, res: Response) {
    const authHeader = req.header('Authorization')
    if (undefined == authHeader) {
      res.status(401).json()
      return [401, {}]
    }
    const jwtPayload: JwtPayload | string = verify(authHeader)
    if ('string' == typeof jwtPayload) {
      res.status(401).json()
      return [401, {}]
    }

    const result = {
      result: await lmsController.lectureAddController(jwtPayload, req.body)
    }

    if (result.result == 'err') {
      res.status(500).json()
      return [500, {}]
    } else {
      res.json(result)
      return [200, result]
    }
  }

  @loggedRouter('lms', 'll')
  private async llRoute(req: Request<undefined, undefined, undefined, ITypeLectureListReqQuery>, res: Response) {
    const authHeader = req.header('Authorization')
    if (undefined == authHeader) {
      res.status(401).json()
      return [401, {}]
    }
    const jwtPayload: JwtPayload | string = verify(authHeader)
    if ('string' == typeof jwtPayload) {
      res.status(401).json()
      return [401, {}]
    }

    const result: ITypeLectureListResBody | string = await lmsController.lectureListController(
      jwtPayload,
      req.query.all == 'true'
    )

    if (result == 'err') {
      res.status(500).json()
      return [500, {}]
    } else {
      res.json(result)
      return [200, result]
    }
  }

  @loggedRouter('lms', 'ea')
  private async eaRoute(req: Request<undefined, undefined, undefined, ITypeEnrolAddReqQuery>, res: Response) {
    const authHeader = req.header('Authorization')
    if (undefined == authHeader) {
      res.status(401).json()
      return [401, {}]
    }
    const jwtPayload: JwtPayload | string = verify(authHeader)
    if ('string' == typeof jwtPayload) {
      res.status(401).json()
      return [401, {}]
    }

    const result = {
      result: await lmsController.enrolAddController(jwtPayload, req.query)
    }

    if (result.result == 'err') {
      res.status(500).json()
      return [500, {}]
    } else {
      res.json(result)
      return [200, result]
    }
  }

  @loggedRouter('lms', 'ba')
  private async baRoute(
    req: Request<undefined, undefined, ITypeBoardAddReqBody, ITypeBoardAddReqQuery>,
    res: Response
  ) {
    const authHeader = req.header('Authorization')
    if (undefined == authHeader) {
      res.status(401).json()
      return [401, {}]
    }
    const jwtPayload: JwtPayload | string = verify(authHeader)
    if ('string' == typeof jwtPayload) {
      res.status(401).json()
      return [401, {}]
    }

    const result = {
      result: await lmsController.boardAddController(req.body, req.query)
    }

    if (result.result == 'err') {
      res.status(500).json()
      return [500, {}]
    } else {
      res.json(result)
      return [200, result]
    }
  }

  @loggedRouter('lms', 'bl')
  private async blRoute(req: Request<undefined, undefined, undefined, ITypeBoardListReqQuery>, res: Response) {
    const authHeader = req.header('Authorization')
    if (undefined == authHeader) {
      res.status(401).json()
      return [401, {}]
    }
    const jwtPayload: JwtPayload | string = verify(authHeader)
    if ('string' == typeof jwtPayload) {
      res.status(401).json()
      return [401, {}]
    }

    const result: ITypeBoardListResBody | string = await lmsController.boardListController(jwtPayload, req.query)

    if (result == 'err') {
      res.status(500).json()
      return [500, {}]
    } else {
      res.json(result)
      return [200, result]
    }
  }

  @loggedRouter('lms', 'bd')
  private async bdRoute(req: Request<undefined, undefined, undefined, ITypeBoardDetailReqQuery>, res: Response) {
    const authHeader = req.header('Authorization')
    if (undefined == authHeader) {
      res.status(401).json()
      return [401, {}]
    }
    const jwtPayload: JwtPayload | string = verify(authHeader)
    if ('string' == typeof jwtPayload) {
      res.status(401).json()
      return [401, {}]
    }

    const result: ITypeBoardDetailResBody | string = await lmsController.boardDetailController(jwtPayload, req.query)

    if (result == 'err') {
      res.status(500).json()
      return [500, {}]
    } else {
      res.json(result)
      return [200, result]
    }
  }
}

export default LmsController
