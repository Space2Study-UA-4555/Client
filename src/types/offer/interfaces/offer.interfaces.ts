import { ButtonProps } from '@mui/material/Button'
import {
  ProficiencyLevelEnum,
  CommonEntityFields,
  UserResponse,
  SubjectNameInterface,
  LanguagesEnum,
  Faq,
  UserRoleEnum,
  CategoryInterface,
  StatusEnum,
  SortByEnum
} from '~/types'

export interface Offer extends CommonEntityFields {
  title: string
  price: number
  proficiencyLevel: ProficiencyLevelEnum[]
  description: string
  languages: LanguagesEnum[]
  enrolledUsers: string[]
  authorRole: UserRoleEnum.Tutor | UserRoleEnum.Student
  author: Pick<
    UserResponse,
    | '_id'
    | 'totalReviews'
    | 'photo'
    | 'professionalSummary'
    | 'firstName'
    | 'lastName'
    | 'FAQ'
    | 'averageRating'
  >
  subject: SubjectNameInterface
  category: CategoryInterface
  FAQ: Faq[]
  status: StatusEnum
}

export interface ButtonActions {
  label: string
  buttonProps?: ButtonProps<'button', { to?: string }>
}

export interface PriceRangeParams {
  authorRole: UserRoleEnum
  categoryId?: string
  subjectId?: string
}

export interface PriceRangeResponse {
  minPrice: number
  maxPrice: number
}

export interface GetOffersResponse {
  items: Offer[]
  count: number
}

export interface GetOffersParams {
  authorRole: UserRoleEnum
  categoryId?: string
  subjectId?: string
  search?: string
  sort?: SortByEnum
  skip?: number
  limit?: number
}
