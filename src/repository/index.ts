import { refreshUserRepo, refreshTokenRepo } from './auth'
import { refreshLectureRepo, refreshBoardRepo, refreshEnrolmentRepo } from './lms'

export function refreshAllRepo(): void {
  refreshUserRepo()
  refreshTokenRepo()
  refreshLectureRepo()
  refreshBoardRepo()
  refreshEnrolmentRepo()
}
