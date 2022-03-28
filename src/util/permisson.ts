import { JwtPayload } from 'jsonwebtoken'
import { verify } from './jwt'
import { ITypeLectureListResBody } from '../type/lms'
import lmsController from '../controller/lms'

export function checkAuth(tp: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = function (...args: any[]) {
      const authHeader = args[0].header('Authorization')
      if (undefined == authHeader) {
        args[1].status(401).json()
        return [401, {}]
      }
      const jwtPayload: JwtPayload | string = verify(authHeader)
      if ('string' == typeof jwtPayload) {
        args[1].status(401).json()
        return [401, {}]
      }

      if ('all' !== tp) {
        if (tp !== jwtPayload.tp) {
          args[1].status(401).json()
          return [401, {}]
        }
      }

      args.splice(2, 0, jwtPayload)

      return original.apply(this, args)
    }
  }
}

export function checkLecture() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = async function (...args: any[]) {
      const lectures: ITypeLectureListResBody | string = await lmsController.lectureListController(args[2], false)
      if ('string' == typeof lectures) {
        args[1].status(500).json()
        return [500, {}]
      }
      let owner: boolean = false
      for (const lecture of lectures.list) if (Number(lecture.id) === Number(args[0].query.id)) owner = true
      if (!owner) {
        args[1].status(401).json()
        return [401, {}]
      }

      return original.apply(this, args)
    }
  }
}
