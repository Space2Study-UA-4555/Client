import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'

import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import InterestsStep from '~/containers/student-home-page/interests-step/InterestsStep'

import useConfirm from '~/hooks/use-confirm'

import {
  studentStepLabels,
  tutorStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

interface UserStepsWrapperProps {
  userRole: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()
  const { setNeedConfirmation } = useConfirm()

  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  useEffect(() => {
    setNeedConfirmation(true)
  }, [setNeedConfirmation])

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

  const childrenArr =
    userRole === student
      ? [
          <GeneralInfoStep
            isUserFetched={isUserFetched}
            key='1'
            setIsUserFetched={setIsUserFetched}
          />,
          <InterestsStep key='2' />,
          <LanguageStep key='3' />,
          <AddPhotoStep key='4' />
        ]
      : [
          <GeneralInfoStep
            isUserFetched={isUserFetched}
            key='1'
            setIsUserFetched={setIsUserFetched}
          />,
          <SubjectsStep key='2' />,
          <LanguageStep key='3' />,
          <AddPhotoStep key='4' />
        ]

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper steps={stepLabels}>{childrenArr}</StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
