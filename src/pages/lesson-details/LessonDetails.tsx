import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'

import Loader from '~/components/loader/Loader'
import AppButton from '~/components/app-button/AppButton'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { useSnackBarContext } from '~/context/snackbar-context'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'

import { snackbarVariants } from '~/constants'
import { styles } from '~/pages/lesson-details/LessonDetails.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import { createUrlPath } from '~/utils/helper-functions'
import { ButtonVariantEnum, ErrorResponse, Lesson } from '~/types'

const defaultResponse: Lesson = {
  _id: '',
  title: '',
  description: '',
  content: '',
  attachments: [],
  category: null,
  author: '',
  createdAt: '',
  updatedAt: ''
}

const LessonDetails = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const { setAlert } = useSnackBarContext()

  const handleResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getLesson = useCallback(() => ResourceService.getLesson(id), [id])

  const { response: lesson, loading } = useAxios<Lesson, string>({
    service: getLesson,
    defaultResponse,
    onResponseError: handleResponseError
  })

  if (loading) {
    return <Loader pageLoad />
  }

  return (
    <PageWrapper>
      <Box sx={styles.root}>
        <Box sx={styles.header}>
          <AppButton
            component={Link}
            to={createUrlPath(authRoutes.myResources.editLesson.path, id)}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.edit')}
            <EditIcon sx={styles.editIcon} />
          </AppButton>
        </Box>
        <Typography sx={styles.title}>{lesson.title}</Typography>
        <Typography sx={styles.description}>{lesson.description}</Typography>
        <Accordion defaultExpanded disableGutters sx={styles.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={styles.accordionTitle}>
              {t('lesson.content')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              dangerouslySetInnerHTML={{ __html: lesson.content }}
              sx={styles.content}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </PageWrapper>
  )
}

export default LessonDetails
