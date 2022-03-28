import logger from '../util/logger'
import { getLectureRepo, getBoardRepo, getEnrolmentRepo } from '../repository/lms'
// import {} from "../type/lms";
import { Board, Enrolment, Lecture } from '../domain/lms'

class LmsService {
  async addLecture(profId: number, title: string): Promise<Lecture | undefined> {
    try {
      return await getLectureRepo().add(profId, title)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }

  async getLecture(lectureId: number): Promise<Lecture | undefined> {
    try {
      return await getLectureRepo().get(lectureId)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }

  async listAllLecture(): Promise<Lecture[] | undefined> {
    try {
      return await getLectureRepo().listAll()
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }

  async listLectureByProfId(profId: number): Promise<Lecture[] | undefined> {
    try {
      return await getLectureRepo().listByProfId(profId)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }

  async addBoard(lectureId: number, title: string, content: string): Promise<Board | undefined> {
    try {
      return await getBoardRepo().add(lectureId, title, content)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }

  async listBoardByLectureId(lectureId: number): Promise<Board[] | undefined> {
    try {
      return await getBoardRepo().listByLectureId(lectureId)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }

  async detailBoardByBoardId(lectureId: number, boardId: number): Promise<Board | undefined> {
    try {
      return await getBoardRepo().detailByLectureIdAndBoardId(lectureId, boardId)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }

  async addEnrolment(stdtId: number, lectureId: number): Promise<Enrolment | undefined> {
    try {
      return await getEnrolmentRepo().add(stdtId, lectureId)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }

  async listEnrolmentByStdtId(stdtId: number): Promise<Enrolment[] | undefined> {
    try {
      return await getEnrolmentRepo().listByStdtId(stdtId)
    } catch (e: any) {
      logger.error(e.stack)
    }
    return undefined
  }
}

const lmsService = new LmsService()

export { lmsService }
