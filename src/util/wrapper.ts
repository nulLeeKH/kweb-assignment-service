import { NextFunction, Request, Response, RequestHandler } from 'express'

function Wrapper(cb: RequestHandler): RequestHandler {
  return function _Wrapper(req: Request, res: Response, next: NextFunction) {
    return Promise.resolve(cb(req, res, next)).catch(next)
  }
}

export default Wrapper
