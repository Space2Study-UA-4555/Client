import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'
import GeneralStep from '~/containers/student-home-page/general-step/GeneralStep'
import InterestsStep from '~/containers/student-home-page/interests-step/InterestsStep'
import LanguageStep from '~/containers/student-home-page/language-step/LanguageStep'
import PhotoStep from '~/containers/student-home-page/photo-step/PhotoStep'

const StudentStepper = () => {
  return (
    <UserStepsWrapper
      steps={[
        { label: 'general', component: GeneralStep },
        { label: 'interests', component: InterestsStep },
        { label: 'language', component: LanguageStep },
        { label: 'photo', component: PhotoStep }
      ]}
      userRole='student'
    />
  )
}

export default StudentStepper
