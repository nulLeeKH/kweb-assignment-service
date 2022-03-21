import { refreshUserRepo } from './auth'
import { refreshTokenRepo } from "./token";

export function refreshAllRepo(): void {
  refreshUserRepo()
  refreshTokenRepo()
}
