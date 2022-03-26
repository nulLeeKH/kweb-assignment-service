import logger, { loggedController } from '../util/logger'
import {
  ITypeTitle,
  ITypeBoardAddReqBody,
  ITypeBoardListReqBody,
  ITypeBoardListResBody,
  ITypeLectureAddReqBody
} from '../type/lms'
import { lmsService } from '../service/lms'
import { JwtPayload } from 'jsonwebtoken'
// import { HttpException } from '../middleware/errorHandler';

class lmsControllerClass {
  @loggedController('lms', 'lecture_add')
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

  @loggedController('lms', 'board_add')
  async boardAddController(payload: JwtPayload, body: ITypeBoardAddReqBody): Promise<string> {
    try {
      const result = await lmsService.addBoard(payload.id, body.title, body.content)
      if (undefined == result) {
        return 'err'
      }
      return 'done'
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }

  @loggedController('lms', 'board_list')
  async boardListController(payload: JwtPayload, body: ITypeBoardListReqBody): Promise<ITypeBoardListResBody | string> {
    try {
      const list = await lmsService.listBoardByLectureId(body.id)
      if (undefined == list) {
        return 'err'
      }
      const result: ITypeBoardListResBody = { list: [] }
      for (const post of list) {
        result.list[result.list.length] = <ITypeTitle>{ id: post.id, title: post.title }
      }
      return result
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }
}

const lmsController = new lmsControllerClass()
export default lmsController
