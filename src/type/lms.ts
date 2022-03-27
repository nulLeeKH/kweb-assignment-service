import { ITypeId } from './common'

export interface ITypeTitle extends ITypeId {
  title: string
}

export interface ITypePost extends ITypeTitle {
  content: string
}

export interface ITypeBoardDetail extends ITypePost {}

export interface ITypeLectureAddReqBody extends ITypeTitle {}

export interface ITypeBoardAddReqBody extends ITypeBoardDetail {}

export interface ITypeLectureListResBody {
  list: ITypeTitle[]
}

export interface ITypeBoardListReqBody extends ITypeId {}
export interface ITypeBoardListResBody {
  list: ITypeTitle[]
}

export interface ITypeBoardDetailReqBody extends ITypeId {}
export interface ITypeBoardDetailResBody extends ITypeBoardDetail {}
