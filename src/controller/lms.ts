import logger, { loggedController } from '../util/logger'
import {
  ITypeBoardAddReqBody,
  ITypeBoardDetailReqBody,
  ITypeBoardDetailResBody,
  ITypeBoardListReqBody,
  ITypeBoardListResBody,
  ITypeEnrolAddReqBody,
  ITypeLectureAddReqBody,
  ITypeLectureListResBody,
  ITypeTitleWithId
} from '../type/lms'
import { lmsService } from '../service/lms'
import { JwtPayload } from 'jsonwebtoken'
import { Lecture } from '../domain/lms'

// import { HttpException } from '../middleware/errorHandler';

class LmsControllerClass {
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

  @loggedController('lms', 'lecture_list')
  async lectureListController(payload: JwtPayload, all: boolean): Promise<ITypeLectureListResBody | string> {
    try {
      const result: ITypeLectureListResBody = {
        list: []
      }
      let lectures: Lecture[] = []
      if (all) {
        const temp = await lmsService.listAllLecture()
        if (undefined == temp) {
          return 'err'
        }
        lectures = temp
      } else {
        if ('prof' == payload.tp) {
          const temp = await lmsService.listLectureByProfId(payload.id)
          if (undefined == temp) {
            return 'err'
          }
          lectures = temp
        } else if ('stdt' == payload.tp) {
          const enrolments = await lmsService.listEnrolmentByStdtId(payload.id)
          if (undefined == enrolments) {
            return 'err'
          }
          for (const enrolment of enrolments) {
            const temp = await lmsService.getLecture(Number(enrolment.lectureId))
            if (undefined == temp) {
              return 'err'
            }
            lectures[lectures.length] = temp
          }
        }
      }

      for (const lecture of lectures) {
        result.list[result.list.length] = {
          id: Number(lecture.id),
          title: String(lecture.title)
        }
      }
      return result
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }

  @loggedController('lms', 'enrol_add')
  async enrolAddController(payload: JwtPayload, body: ITypeEnrolAddReqBody): Promise<string> {
    try {
      const result = await lmsService.addEnrolment(payload.id, body.id)
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
        result.list[result.list.length] = <ITypeTitleWithId>{ id: post.id, title: post.title }
      }
      return result
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }

  @loggedController('lms', 'board_detail')
  async boardDetailController(
    payload: JwtPayload,
    body: ITypeBoardDetailReqBody
  ): Promise<ITypeBoardDetailResBody | string> {
    try {
      const result = await lmsService.detailBoardByBoardId(body.id)
      if (undefined == result) {
        return 'err'
      }
      return {
        id: Number(result.id),
        title: String(result.title),
        content: String(result.content)
      }
    } catch (e: any) {
      logger.error(e.stack)
    }
    return 'err'
  }
}

const lmsController = new LmsControllerClass()
export default lmsController
