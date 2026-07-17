import {
  buildStepperPayload,
  mapSubjectIds,
  resolveNativeLanguage
} from '~/utils/build-stepper-payload'

describe('mapSubjectIds', () => {
  it('should map added chips to subject ids', () => {
    const subjects = [
      { category: 'cat1', subject: 'sub1', name: 'English' },
      { category: 'cat1', subject: 'sub2', name: 'Math' },
      { category: 'cat2', subject: null, name: '' }
    ]

    expect(mapSubjectIds(subjects)).toEqual(['sub1', 'sub2'])
  })
})

describe('resolveNativeLanguage', () => {
  it('should read language name from step data object', () => {
    expect(resolveNativeLanguage({ _id: '1', name: 'Ukrainian' })).toBe(
      'Ukrainian'
    )
  })

  it('should fallback to English when language is missing', () => {
    expect(resolveNativeLanguage(null)).toBe('English')
  })
})

describe('buildStepperPayload', () => {
  const tutorSteps = ['generalInfo', 'subjects', 'language', 'photo']

  it('should build finish payload for tutor stepper', () => {
    const stepData = {
      generalInfo: {
        data: {
          firstName: 'Local',
          lastName: 'Tutor',
          country: 'Ukraine',
          state: 'Kyiv',
          city: 'Kyiv',
          professionalSummary: 'Summary'
        }
      },
      subjects: [{ category: 'cat1', subject: 'sub1', name: 'English' }],
      language: null,
      photo: [{ name: 'photo.jpg', src: 'data:image/jpeg;base64,abc' }]
    }

    expect(buildStepperPayload(stepData, tutorSteps)).toEqual({
      photo: 'data:image/jpeg;base64,abc',
      firstName: 'Local',
      lastName: 'Tutor',
      address: {
        country: 'Ukraine',
        state: 'Kyiv',
        city: 'Kyiv'
      },
      professionalSummary: 'Summary',
      mainSubjects: ['sub1'],
      nativeLanguage: 'English'
    })
  })

  it('should use interests label for student stepper', () => {
    const studentSteps = ['generalInfo', 'interests', 'language', 'photo']

    const stepData = {
      generalInfo: {
        data: {
          firstName: 'Local',
          lastName: 'Student',
          country: 'Ukraine',
          state: '',
          city: 'Kyiv',
          professionalSummary: ''
        }
      },
      interests: [{ category: 'cat1', subject: 'sub3', name: 'Art' }],
      language: { _id: '2', name: 'Polish' },
      photo: []
    }

    expect(buildStepperPayload(stepData, studentSteps).mainSubjects).toEqual([
      'sub3'
    ])
    expect(buildStepperPayload(stepData, studentSteps).nativeLanguage).toBe(
      'Polish'
    )
  })
})
