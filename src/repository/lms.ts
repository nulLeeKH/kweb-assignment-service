import { EntityRepository, getConnection, Repository } from 'typeorm'
import { Lecture, Board, Enrolment } from '../domain/lms'
// import {  } from '../type/lms'
// import logger from "../util/logger";

@EntityRepository(Lecture)
class LectureRepository extends Repository<Lecture> {
  add(profId: number, title: string): Promise<Lecture> {
    const newLecture = new Lecture()
    newLecture.profId = profId
    newLecture.title = title
    return this.save(newLecture)
  }

  get(lectureId: number): Promise<Lecture> {
    return this.createQueryBuilder('lecture').where('lecture.id = :lectureId', { lectureId: lectureId }).getOneOrFail()
  }

  listByProfId(profId: number): Promise<Lecture[]> {
    return this.createQueryBuilder('lecture').where('lecture.prof_id = :profId', { profId: profId }).getMany()
  }
}

@EntityRepository(Board)
class BoardRepository extends Repository<Board> {
  add(lectureId: number, title: string, content: string): Promise<Board> {
    const newBoard = new Board()
    newBoard.lectureId = lectureId
    newBoard.title = title
    newBoard.content = content
    return this.save(newBoard)
  }

  detailByBoardId(boardId: number): Promise<Board> {
    return this.createQueryBuilder('board').where('board.id = :boardId', { boardId: boardId }).getOneOrFail()
  }

  listByLectureId(lectureId: number): Promise<Board[]> {
    return this.createQueryBuilder('board').where('board.lecture_id = :lectureId', { lectureId: lectureId }).getMany()
  }
}

@EntityRepository(Enrolment)
class EnrolmentRepository extends Repository<Enrolment> {
  add(lectureId: number, stdtId: number): Promise<Enrolment> {
    const newEnrolment = new Enrolment()
    newEnrolment.lectureId = lectureId
    newEnrolment.stdtId = stdtId
    return this.save(newEnrolment)
  }

  listByStdtId(stdtId: number): Promise<Enrolment[]> {
    return this.createQueryBuilder('enrolment').where('enrolment.stdt_id = :stdtId', { stdtId: stdtId }).getMany()
  }
}

let LectureRepo: LectureRepository

export function refreshLectureRepo(): void {
  const conn = getConnection()
  LectureRepo = conn.getCustomRepository(LectureRepository)
}

export function getLectureRepo(): LectureRepository {
  return LectureRepo
}

let BoardRepo: BoardRepository

export function refreshBoardRepo(): void {
  const conn = getConnection()
  BoardRepo = conn.getCustomRepository(BoardRepository)
}

export function getBoardRepo(): BoardRepository {
  return BoardRepo
}

let EnrolmentRepo: EnrolmentRepository

export function refreshEnrolmentRepo(): void {
  const conn = getConnection()
  EnrolmentRepo = conn.getCustomRepository(EnrolmentRepository)
}

export function getEnrolmentRepo(): EnrolmentRepository {
  return EnrolmentRepo
}
