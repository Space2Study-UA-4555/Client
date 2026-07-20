import { getPhotoForApi } from '~/utils/photo-file'

export const mapSubjectIds = (subjects = []) =>
  subjects
    .filter((item) => item.name && item.subject)
    .map((item) => item.subject)

export const resolveNativeLanguage = (language) =>
  language?.name ?? language ?? 'English'

export const buildStepperPayload = (stepData, steps) => {
  const [generalLabel, subjectsLabel, languageLabel, photoLabel] = steps

  const {
    firstName = '',
    lastName = '',
    country = null,
    state = null,
    city = null,
    professionalSummary = ''
  } = stepData[generalLabel]?.data ?? {}

  return {
    photo: getPhotoForApi(stepData[photoLabel]?.[0]),
    firstName,
    lastName,
    address: {
      country: country ?? '',
      state: state ?? '',
      city: city ?? ''
    },
    professionalSummary,
    mainSubjects: mapSubjectIds(stepData[subjectsLabel] ?? []),
    nativeLanguage: resolveNativeLanguage(stepData[languageLabel])
  }
}
