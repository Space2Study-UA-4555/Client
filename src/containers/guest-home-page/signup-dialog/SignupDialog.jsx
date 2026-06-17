import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import useForm from '~/hooks/use-form'
import { useSignUpMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import { signup, snackbarVariants, student, tutor } from '~/constants'

import styles from '~/containers/guest-home-page/signup-dialog/SignupDialog.styles'

const SignupDialog = ({ type = student }) => {
  const { t } = useTranslation()
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [signUp] = useSignUpMutation()

  const img = type === tutor ? tutorImg : studentImg

  const { handleInputChange, handleBlur, handleSubmit, data, errors } = useForm(
    {
      onSubmit: async () => {
        try {
          await signUp({ ...data, role: type }).unwrap()
          setAlert({
            severity: snackbarVariants.success,
            message: 'signup.confirmEmailTitle'
          })
          closeModal()
        } catch (e) {
          setAlert({
            severity: snackbarVariants.error,
            message: `errors.${e.data.code}`
          })
        }
      },
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='signup' component='img' src={img} sx={styles.img} />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t(`signup.head.${type}`)}
        </Typography>
        <Box sx={styles.form}>
          <SignupForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            disabled
            role={type}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
