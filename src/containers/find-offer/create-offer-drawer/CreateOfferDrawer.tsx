import { FC, SyntheticEvent, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LeakAddIcon from '@mui/icons-material/LeakAdd'
import InputAdornment from '@mui/material/InputAdornment'
import Slider from '@mui/material/Slider'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import UAHIcon from '~/assets/img/find-offer/currency_uah.svg'
import OrderedListItem from '~/components/ordered-list-item/OrderedListItem'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import CheckboxList from '~/components/checkbox-list/CheckboxList'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppSelect from '~/components/app-select/AppSelect'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AppButton from '~/components/app-button/AppButton'
import useForm from '~/hooks/use-form'
import { useAppSelector } from '~/hooks/use-redux'
import useConfirm from '~/hooks/use-confirm'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import {
  CategoryNameInterface,
  SubjectNameInterface,
  UserRoleEnum,
  LanguagesEnum,
  ButtonVariantEnum
} from '~/types'
import {
  CreateOfferDrawerForm,
  createOfferValidation,
  initialValues,
  languages,
  proficiencyLevels,
  courses
} from './CreateOfferDrawer.constants'
import { styles } from '~/containers/find-offer/create-offer-drawer/CreateOfferDrawer.styles'

interface CreateOfferDrawerProps {
  onClose: () => void
  onCreated?: () => void
}

const CreateOfferDrawer: FC<CreateOfferDrawerProps> = ({ onCreated }) => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const {
    data,
    handleInputChange,
    handleNonInputValueChange,
    isDirty,
    errors,
    handleBlur,
    handleSubmit
  } = useForm<CreateOfferDrawerForm>({
    initialValues,
    validations: createOfferValidation,
    onSubmit: () => {
      console.log(buildOfferPayload(data))
      onCreated?.()
    }
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const isTutor = userRole === UserRoleEnum.Tutor

  const descriptionMaxLength = isTutor ? 1000 : 2000

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(data.category),
    [data.category]
  )

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleNonInputValueChange('category', value?._id ?? null)
    handleNonInputValueChange('subject', null)
  }

  const onSubjectChange = (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    handleNonInputValueChange('subject', value?._id ?? null)
  }

  const onLanguageChange = (language: LanguagesEnum | '') => {
    if (!language || data.languages.includes(language)) return

    handleNonInputValueChange('languages', [...data.languages, language])
    handleNonInputValueChange('language', '')
  }

  const onLanguageDelete = (language: LanguagesEnum) => {
    handleNonInputValueChange(
      'languages',
      data.languages.filter((item) => item !== language)
    )
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (/^\d*$/.test(value)) {
      handleInputChange('price')(e)
    }
  }

  const onPriceRangeChange = (_: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      handleNonInputValueChange('priceRange', value as [number, number])
    }
  }

  const onFAQChange = (
    index: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    const updatedFAQ = data.FAQ.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [field]: value } : item
    )

    handleNonInputValueChange('FAQ', updatedFAQ)
  }

  const onAddFAQ = () => {
    if (data.FAQ.length >= 5) return

    handleNonInputValueChange('FAQ', [
      ...data.FAQ,
      { question: '', answer: '' }
    ])
  }

  const onFAQDelete = (index: number) => {
    if (data.FAQ.length === 1) {
      handleNonInputValueChange('FAQ', [{ question: '', answer: '' }])
      return
    }

    handleNonInputValueChange(
      'FAQ',
      data.FAQ.filter((_, itemIndex) => itemIndex !== index)
    )
  }

  const buildOfferPayload = (data: CreateOfferDrawerForm) => {
    const payload = data
    return payload
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={styles.titleWithIcon}>
          <LeakAddIcon sx={styles.titleIcon} />
          <Typography sx={styles.title}>
            {t(`offerPage.createOffer.title.${userRole}`)}
          </Typography>
        </Box>
        <Typography sx={styles.description}>
          {t(`offerPage.createOffer.description.${userRole}`)}
        </Typography>
      </Box>

      <OrderedListItem
        description={t(`offerPage.description.category.${userRole}`)}
        number={1}
        title={t(`offerPage.title.firstStep.${userRole}`)}
      >
        <Box sx={styles.sectionContent}>
          <AsyncAutocomplete<CategoryNameInterface>
            labelField='name'
            onBlur={handleBlur('category')}
            onChange={onCategoryChange}
            service={categoryService.getCategoriesNames}
            sx={styles.inputAutocomplete}
            textFieldProps={{
              label: t('offerPage.labels.category'),
              error: Boolean(errors.category),
              helperText: errors.category ? t(errors.category) : ''
            }}
            value={data.category}
            valueField='_id'
          />
          <AsyncAutocomplete<SubjectNameInterface>
            disabled={!data.category}
            fetchCondition={Boolean(data.category)}
            labelField='name'
            onBlur={handleBlur('subject')}
            onChange={onSubjectChange}
            service={getSubjectsNames}
            sx={styles.inputAutocomplete}
            textFieldProps={{
              label: t('offerPage.labels.subject'),
              error: Boolean(errors.subject),
              helperText: errors.subject ? t(errors.subject) : ''
            }}
            value={data.subject}
            valueField='_id'
          />

          <Typography sx={styles.fieldDescription}>
            {t(`offerPage.description.level.${userRole}`)}
          </Typography>
          <CheckboxList
            error={errors.proficiencyLevel ? t(errors.proficiencyLevel) : ''}
            items={proficiencyLevels}
            onChange={(value) =>
              handleNonInputValueChange('proficiencyLevel', value)
            }
            value={data.proficiencyLevel}
          />
        </Box>
      </OrderedListItem>

      <OrderedListItem
        number={2}
        title={t(`offerPage.title.secondStep.${userRole}`)}
      >
        <Box sx={styles.sectionContent}>
          {isTutor && (
            <>
              <Typography sx={styles.fieldDescription}>
                {t(`offerPage.description.title.${userRole}`)}
              </Typography>
              <Box sx={styles.textFieldWithCounter}>
                <AppTextField
                  errorMsg={errors.title ? t(errors.title) : ''}
                  fullWidth
                  inputProps={{ maxLength: 100 }}
                  label={t('offerPage.labels.title')}
                  onBlur={handleBlur('title')}
                  onChange={handleInputChange('title')}
                  value={data.title}
                />
                <Typography sx={styles.counter}>
                  {`${data.title.length}/100`}
                </Typography>
              </Box>
            </>
          )}
          <Typography sx={styles.fieldDescription}>
            {t(`offerPage.description.describe.${userRole}`)}
          </Typography>

          <AppTextArea
            errorMsg={errors.description ? t(errors.description) : ''}
            fullWidth
            label={t(`offerPage.labels.describe.${userRole}`)}
            maxLength={descriptionMaxLength}
            onBlur={handleBlur('description')}
            onChange={handleInputChange('description')}
            sx={styles.textareaWrapper}
            value={data.description}
          />

          <Typography sx={styles.fieldDescription}>
            {t(`offerPage.description.languages.${userRole}`)}
          </Typography>
          <AppSelect
            error={Boolean(errors.languages && data.languages.length < 1)}
            fields={languages}
            label={t('offerPage.labels.language')}
            onBlur={handleBlur('languages')}
            setValue={onLanguageChange}
            value={data.language}
          />
          {errors.languages && data.languages.length < 1 && (
            <Tooltip sx={styles.errorTooltip} title={t(errors.languages)}>
              <Typography sx={styles.errorLanguages} variant='caption'>
                {t(errors.languages)}
              </Typography>
            </Tooltip>
          )}
          {data.languages.length > 0 && (
            <AppChipList
              defaultQuantity={data.languages.length}
              handleChipDelete={onLanguageDelete}
              items={data.languages}
              wrapperStyle={styles.chipList}
            />
          )}

          <Typography sx={styles.fieldDescription}>
            {t(`offerPage.description.price.${userRole}`)}
          </Typography>
          {isTutor ? (
            <AppTextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Box
                      component='img'
                      src={UAHIcon}
                      sx={styles.currencyIcon}
                    />
                  </InputAdornment>
                )
              }}
              errorMsg={errors.price ? t(errors.price) : ''}
              inputProps={{ inputMode: 'numeric' }}
              onBlur={handleBlur('price')}
              onChange={handlePriceChange}
              sx={styles.priceInput}
              value={data.price}
            />
          ) : (
            <Box sx={styles.priceRangeBlock}>
              <Box sx={styles.priceRangeLabels}>
                <Typography sx={styles.priceRangeLabel}>150</Typography>
                <Typography sx={styles.priceRangeLabel}>3500</Typography>
              </Box>

              <Slider
                max={3500}
                min={150}
                onChange={onPriceRangeChange}
                sx={styles.priceRangeSlider}
                value={data.priceRange}
              />

              <Box sx={styles.priceRangeInputs}>
                <AppTextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Box
                          component='img'
                          src={UAHIcon}
                          sx={styles.currencyIcon}
                        />
                      </InputAdornment>
                    )
                  }}
                  inputProps={{ inputMode: 'numeric' }}
                  placeholder='Min'
                  sx={styles.rangeInput}
                  value={data.priceRange[0]}
                  withHelperText={false}
                />

                <HorizontalRuleIcon sx={styles.rangeSeparator} />
                <AppTextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Box
                          component='img'
                          src={UAHIcon}
                          sx={styles.currencyIcon}
                        />
                      </InputAdornment>
                    )
                  }}
                  inputProps={{ inputMode: 'numeric' }}
                  placeholder='Max'
                  sx={styles.rangeInput}
                  value={data.priceRange[1]}
                  withHelperText={false}
                />
              </Box>
              <Typography sx={styles.fitText}>
                0 tutors fit your needs
              </Typography>
            </Box>
          )}

          {isTutor && (
            <>
              <Typography sx={styles.fieldDescription}>
                {t(`offerPage.description.course.${userRole}`)}
              </Typography>
              <AppSelect
                fields={courses}
                label={t('offerPage.labels.course')}
                setValue={(value) => handleNonInputValueChange('course', value)}
                value={data.course}
              />
            </>
          )}
        </Box>
      </OrderedListItem>

      {isTutor && (
        <OrderedListItem number={3} title={t('offerPage.title.thirdStep')}>
          <Box sx={styles.sectionContent}>
            <Typography sx={styles.fieldDescription}>
              {t(`offerPage.description.thirdStep.${userRole}`)}
            </Typography>

            {data.FAQ.map((item, index) => (
              <Box key={index} sx={styles.faqItem}>
                <Box sx={styles.faqFieldsWithDelete}>
                  <Box sx={styles.faqFields}>
                    <AppTextField
                      fullWidth
                      label={t('offerPage.labels.question')}
                      onChange={(event) =>
                        onFAQChange(index, 'question', event.target.value)
                      }
                      value={item.question}
                      withHelperText={false}
                    />
                    <AppTextArea
                      fullWidth
                      label={t('offerPage.labels.answer')}
                      maxLength={400}
                      onChange={(event) =>
                        onFAQChange(index, 'answer', event.target.value)
                      }
                      sx={styles.faqTextareaWrapper}
                      value={item.answer}
                    />
                  </Box>

                  <IconButton
                    onClick={() => onFAQDelete(index)}
                    sx={styles.deleteFAQButton}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Box>
            ))}
            <AppButton
              disabled={data.FAQ.length >= 5}
              onClick={onAddFAQ}
              sx={styles.addQuestionButton}
              variant={ButtonVariantEnum.Tonal}
            >
              {t('button.addQuestion')}
            </AppButton>
          </Box>
        </OrderedListItem>
      )}

      <Box sx={styles.actions}>
        <AppButton sx={styles.primaryAction} type='submit'>
          {t(`offerPage.createOffer.buttonTitles.${userRole}`)}
        </AppButton>
        <AppButton
          sx={styles.secondaryAction}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('button.addToDrafts')}
        </AppButton>
      </Box>
    </Box>
  )
}

export default CreateOfferDrawer
