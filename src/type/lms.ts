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

export interface ITypeBoardAddReqBody extends ITypePost {}

export interface ITypeLectureListResBody {
  list: ITypeTitleWithId[]
}

export interface ITypeBoardListReqBody extends ITypeId {}
export interface ITypeBoardListResBody {
  list: ITypeTitleWithId[]
}

export interface ITypeBoardDetailReqBody extends ITypeId {}
export interface ITypeBoardDetailResBody extends ITypePostWithId {}
