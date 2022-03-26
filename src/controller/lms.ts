import logger, { loggedController } from '../util/logger'
import { ITypeLectureAddReqBody } from '../type/lms'
import { lmsService } from '../service/lms'
import { JwtPayload } from 'jsonwebtoken'
// import { HttpException } from '../middleware/errorHandler';

class lmsControllerClass {
  @loggedController('lms', 'add_lecture')
  async lectureAddController(payload: JwtPayload, body: ITypeLectureAddReqBody): Promise<string> {
    try {
      const result = await lmsService.addLecture(payload.id, body.title)
      if (undefined == result) {
        return 'err'
      }
      return 'done'
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }

  @loggedController('lms', 'add_lecture')
  async addLectureController(payload: JwtPayload, body: ITypeLectureAddReqBody): Promise<string> {
    try {
      const result = await lmsService.addLecture(payload.id, body.title)
      if (undefined == result) {
        return 'err'
      }
      return 'done'
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }
}

const lmsController = new lmsControllerClass()
export default lmsController
