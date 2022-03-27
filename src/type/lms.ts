import { ITypeId } from './common'

export interface ITypeTitle {
  title: string
}

export interface ITypeTitleWithId extends ITypeTitle, ITypeId {}

export interface ITypePost extends ITypeTitle {
  content: string
}

export interface ITypePostWithId extends ITypePost, ITypeId {}

export interface ITypeLectureAddReqBody extends ITypeTitle {}

export interface ITypeEnrolAddReqQuery extends ITypeId {}

export interface ITypeBoardAddReqBody extends ITypePost {}

export interface ITypeBoardAddReqQuery extends ITypeId {}

export interface ITypeLectureListReqQuery {
  all: string
}
export interface ITypeLectureListResBody {
  list: ITypeTitleWithId[]
}

export interface ITypeBoardListReqQuery extends ITypeId {}
export interface ITypeBoardListResBody {
  list: ITypeTitleWithId[]
}

export interface ITypeBoardDetailReqQuery extends ITypeId {}
export interface ITypeBoardDetailResBody extends ITypePostWithId {}
