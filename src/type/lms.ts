import { ITypeId } from './common'

interface ITypeTitle {
  title: string
}

interface ITypePost extends ITypeTitle {
  content: string
}

interface ITypeBoardDetail extends ITypePost {}

export interface ITypeLectureAddReqBody extends ITypeTitle {}

export interface ITypeBoardAddReqBody extends ITypeBoardDetail {}

export interface ITypeBoardListReqBody extends ITypeId {}
export interface ITypeBoardListResBody {
  list: ITypeTitle[]
}

export interface ITypeBoardDetailReqBody extends ITypeId {}
export interface ITypeBoardDetailResBody extends ITypeBoardDetail {}
