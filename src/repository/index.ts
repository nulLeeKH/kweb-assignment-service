import {
  refreshUserRepo,
  refreshTokenRepo} from './auth'

export function refreshAllRepo(): void {
  refreshUserRepo()
  refreshTokenRepo()
}
