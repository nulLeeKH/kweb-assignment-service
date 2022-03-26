export interface ITypeId {
  id: number
}

export interface ITypeTimestamps {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface ITypeUser {
  username: string
  name: string
  uniqueNo: string
  type: string
}

export interface ITypeTokenPayload extends ITypeId {
  un: string
  nm: string
  no: string
  tp: string
}
