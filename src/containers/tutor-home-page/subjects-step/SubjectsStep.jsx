import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { ButtonVariantEnum } from '~/types'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import StepLayout from '~/containers/tutor-home-page/step-layout/StepLayout'

const isChip = (item) => Boolean(item.name)

const SubjectsStep = ({ btnsBox, stepLabel }) => {
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
    <StepLayout
      btnsBox={btnsBox}
      imgSrc={img}
      title={t('becomeTutor.categories.title')}
    >
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
        disabled={!category || !subject}
        onClick={handleAddSubject}
        sx={styles.addSubjectBtn}
        variant={ButtonVariantEnum.Tonal}
      >
        {t('becomeTutor.categories.btnText')}
      </AppButton>

      {chips.length > 0 && (
        <AppChipList
          defaultQuantity={2}
          handleChipDelete={handleSubjectDelete}
          items={chips.map((item) => item.name)}
        />
      )}
    </StepLayout>
  )
}

export default SubjectsStep
