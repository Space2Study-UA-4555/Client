import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { ButtonVariantEnum } from '~/types'

import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from './InterestsStep.styles'

const isChip = (item) => Boolean(item.name)

const InterestsStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { handleStepData, stepData } = useStepContext()

  const [category, setCategory] = useState(null)
  const [subject, setSubject] = useState(null)
  const [subjectName, setSubjectName] = useState('')

  const getSaved = useCallback(() => {
    const data = stepLabel ? stepData?.[stepLabel] : null
    return Array.isArray(data) ? data : []
  }, [stepData, stepLabel])

  const getChips = (saved) => saved.filter(isChip)

  const getDraft = (saved, chips) =>
    chips.length
      ? saved.find((item) => !isChip(item)) ?? null
      : saved[0] ?? null

  const createDraft = (categoryId, subjectId = null, name = '') => ({
    category: categoryId,
    subject: subjectId,
    subjectName: name
  })

  const saved = getSaved()
  const chips = getChips(saved)

  useEffect(() => {
    const savedItems = getSaved()
    const chipItems = getChips(savedItems)
    const draft = getDraft(savedItems, chipItems)

    if (!chipItems.length) {
      setCategory(draft?.category ?? null)
      setSubject(draft?.subject ?? null)
      setSubjectName(draft?.subjectName ?? '')
    } else {
      setCategory(chipItems[0]?.category ?? draft?.category ?? null)
      setSubject(draft?.subject ?? null)
      setSubjectName(draft?.subjectName ?? '')
    }
  }, [getSaved])

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(category),
    [category]
  )

  const handleCategoryChange = (_, value, reason) => {
    if (reason === 'reset' || (!value && reason !== 'clear')) return

    const categoryId = value?._id ?? null
    const chipItems = getChips(getSaved())

    setCategory(categoryId)
    setSubject(null)
    setSubjectName('')

    if (chipItems.length) {
      handleStepData(stepLabel, chipItems)
    } else if (categoryId) {
      handleStepData(stepLabel, [createDraft(categoryId)])
    } else {
      handleStepData(stepLabel, [])
    }
  }

  const handleSubjectChange = (_, value, reason) => {
    if (reason === 'reset') return

    const chipItems = getChips(getSaved())

    if (!value) {
      if (reason !== 'clear') return

      setSubject(null)
      setSubjectName('')
      if (chipItems.length) {
        handleStepData(stepLabel, chipItems)
      } else if (category) {
        handleStepData(stepLabel, [createDraft(category)])
      } else {
        handleStepData(stepLabel, [])
      }

      return
    }

    const draft = createDraft(category, value._id ?? null, value.name ?? '')

    setSubject(draft.subject)
    setSubjectName(draft.subjectName)

    handleStepData(
      stepLabel,
      chipItems.length ? [...chipItems, draft] : [draft]
    )
  }

  const handleAddSubject = () => {
    if (!category || !subject || !subjectName) return

    const chipItems = getChips(getSaved())

    if (chipItems.some((item) => item.subject === subject)) return

    handleStepData(stepLabel, [
      ...chipItems,
      { category, subject, name: subjectName }
    ])
    setSubject(null)
    setSubjectName('')
  }

  const handleSubjectDelete = (nameToDelete) => {
    const nextSubjects = getSaved().filter(
      (item) => !isChip(item) || item.name !== nameToDelete
    )

    handleStepData(stepLabel, nextSubjects)
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='' component='img' src={img} sx={styles.img} />
      </Box>

      <Box sx={styles.rightBox}>
        <Box sx={styles.form}>
          <Typography sx={styles.title}>
            {t('becomeStudent.interests.title')}
          </Typography>

          <Box sx={styles.mobileImgContainer}>
            <Box alt='' component='img' src={img} sx={styles.mobileImg} />
          </Box>

          <AsyncAutocomplete
            fetchOnFocus={false}
            labelField='name'
            onChange={handleCategoryChange}
            service={categoryService.getCategoriesNames}
            textFieldProps={{
              label: t('becomeStudent.interests.categoryLabel')
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
              label: t('becomeStudent.interests.subjectLabel')
            }}
            value={subject}
            valueField='_id'
          />

          <AppButton
            disabled={!category || !subject}
            onClick={handleAddSubject}
            sx={styles.addSubjectBtn}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('becomeStudent.interests.btnText')}
          </AppButton>

          {chips.length > 0 && (
            <AppChipList
              defaultQuantity={2}
              handleChipDelete={handleSubjectDelete}
              items={chips.map((item) => item.name)}
            />
          )}
        </Box>

        <Box sx={styles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default InterestsStep
