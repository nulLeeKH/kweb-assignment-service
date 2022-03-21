import { Request, Response } from 'express'
import controller from '../class/controller'
import { swaggerDoc } from '../doc/swagger'

class DocController extends controller {
  public basePath = '/doc'

  constructor() {
    super()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/swagger.json', (req: Request, res: Response) => {
      res.json(swaggerDoc)
    })
  }
}

export default DocController
