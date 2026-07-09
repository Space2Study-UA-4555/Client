import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { ButtonVariantEnum } from '~/types'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const SubjectsStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { handleStepData, stepData } = useStepContext()
  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)

  useEffect(() => {
    const savedSubjects = stepLabel ? stepData?.[stepLabel] : null
    const saved = Array.isArray(savedSubjects) ? savedSubjects[0] : null

    setCategory(saved?.category ?? null)
    setSubject(saved?.subject ?? null)
  }, [stepData, stepLabel])

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(category),
    [category]
  )

  const handleCategoryChange = (_, value) => {
    const categoryId = value?._id ?? null

    setCategory(categoryId)
    setSubject(null)
    handleStepData(
      stepLabel,
      categoryId ? [{ category: categoryId, subject: null }] : []
    )
  }

  const handleSubjectChange = (_, value) => {
    const subjectData = category
      ? [
          {
            category,
            subject: value?._id ?? null
          }
        ]
      : []

    setSubject(value?._id ?? null)
    handleStepData(stepLabel, subjectData)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='' component='img' src={img} sx={styles.img} />
      </Box>

      <Box sx={styles.rigthBox}>
        <Box sx={styles.form}>
          <Typography sx={styles.title}>
            {t('becomeTutor.categories.title')}
          </Typography>

          <AsyncAutocomplete
            fetchOnFocus={false}
            labelField='name'
            onChange={handleCategoryChange}
            service={categoryService.getCategoriesNames}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={category}
            valueField='_id'
          />

          <AsyncAutocomplete
            disabled={!category}
            fetchCondition={Boolean(category)}
            fetchOnFocus={false}
            labelField='name'
            onChange={handleSubjectChange}
            service={getSubjectsNames}
            textFieldProps={{
              label: t('becomeTutor.categories.subjectLabel')
            }}
            value={subject}
            valueField='_id'
          />

          <AppButton
            disabled
            sx={styles.addSubjectBtn}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('becomeTutor.categories.btnText')}
          </AppButton>
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
