import { LanguagesEnum, ProficiencyLevelEnum } from '~/types'
import { emptyField } from '~/utils/validations/common'

export interface CreateOfferDrawerForm {
  category: string | null
  subject: string | null
  proficiencyLevel: ProficiencyLevelEnum[]
  title: string
  description: string
  languages: LanguagesEnum[]
  language: LanguagesEnum | ''
  price: number | ''
  priceRange: [number, number]
  course: string
  FAQ: {
    question: string
    answer: string
  }[]
}

export const initialValues: CreateOfferDrawerForm = {
  category: null,
  subject: null,
  proficiencyLevel: [],
  title: '',
  description: '',
  languages: [],
  language: '',
  price: '',
  priceRange: [150, 3500],
  course: '',
  FAQ: [{ question: '', answer: '' }]
}

export const proficiencyLevels = Object.values(ProficiencyLevelEnum)
export const languages = Object.values(LanguagesEnum).map((language) => ({
  title: language,
  value: language
}))

export const courses = [{ title: 'Select a course1', value: '' }]

export const createOfferValidation = {
  title: (value: string) => emptyField(value, 'offerPage.errorMessages.title'),
  category: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.category'),
  subject: (value: string | null) =>
    emptyField(value, 'offerPage.errorMessages.subject'),
  proficiencyLevel: (value: string | ProficiencyLevelEnum[]) =>
    Array.isArray(value) && value.length
      ? undefined
      : 'offerPage.errorMessages.level',
  description: (value: string) =>
    emptyField(value, 'offerPage.errorMessages.description'),
  languages: (value: string | LanguagesEnum[]) =>
    Array.isArray(value) && value.length
      ? undefined
      : 'offerPage.errorMessages.languages',
  price: (value: string | number) => {
    if (value === '') {
      return 'offerPage.errorMessages.price'
    }

    if (Number(value) <= 0) {
      return 'offerPage.errorMessages.price'
    }

    return undefined
  }
}
