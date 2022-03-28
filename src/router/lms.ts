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
import { checkAuth, checkLecture } from '../util/permisson'

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
  @checkAuth('prof')
  private async laRoute(
    req: Request<undefined, undefined, ITypeLectureAddReqBody, undefined>,
    res: Response,
    jwtPayload: JwtPayload
  ) {
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
  @checkAuth('all')
  private async llRoute(
    req: Request<undefined, undefined, undefined, ITypeLectureListReqQuery>,
    res: Response,
    jwtPayload: JwtPayload
  ) {
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
  @checkAuth('stdt')
  private async eaRoute(
    req: Request<undefined, undefined, undefined, ITypeEnrolAddReqQuery>,
    res: Response,
    jwtPayload: JwtPayload
  ) {
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
  @checkAuth('prof')
  @checkLecture()
  private async baRoute(
    req: Request<undefined, undefined, ITypeBoardAddReqBody, ITypeBoardAddReqQuery>,
    res: Response,
    _: JwtPayload
  ) {
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
  @checkAuth('all')
  @checkLecture()
  private async blRoute(
    req: Request<undefined, undefined, undefined, ITypeBoardListReqQuery>,
    res: Response,
    jwtPayload: JwtPayload
  ) {
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
  @checkAuth('all')
  @checkLecture()
  private async bdRoute(
    req: Request<undefined, undefined, undefined, ITypeBoardDetailReqQuery>,
    res: Response,
    jwtPayload: JwtPayload
  ) {
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
