import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppTextField from '~/components/app-text-field/AppTextField'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'

import { useStepContext } from '~/context/step-context'
import useAxios from '~/hooks/use-axios'
import { useForm } from '~/hooks/use-form'
import { useAppSelector } from '~/hooks/use-redux'

import { locationService } from '~/services/location-service'
import { userService } from '~/services/user-service'

import img from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

import {
  initialValues,
  validations
} from '~/components/user-steps-wrapper/constants'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import StepLayout from '~/containers/tutor-home-page/step-layout/StepLayout'

const resolveLocationCodes = async (countryName, cityName) => {
  if (!countryName) {
    return { countryCode: null, state: null, stateCode: null }
  }

  const { data: countries } = await locationService.getCountries()
  const country = countries.find((item) => item.name === countryName)
  const countryCode = country?.iso2 ?? null

  if (!countryCode || !cityName) {
    return { countryCode, state: null, stateCode: null }
  }

  const { data: states } = await locationService.getStates(countryCode)

  if (!states.length) {
    return { countryCode, state: null, stateCode: null }
  }

  for (const stateItem of states) {
    const { data: cities } = await locationService.getCities(
      countryCode,
      stateItem.iso2
    )

    if (cities.some((city) => city.name === cityName)) {
      return {
        countryCode,
        state: stateItem.name,
        stateCode: stateItem.iso2
      }
    }
  }

  return { countryCode, state: null, stateCode: null }
}

const GeneralInfoStep = ({
  btnsBox,
  isUserFetched,
  setIsUserFetched,
  stepLabel
}) => {
  const { t } = useTranslation()
  const { userId, userRole } = useAppSelector((state) => state.appMain)
  const { handleStepData, stepData } = useStepContext()

  const isFetchStarted = useRef(false)

  const savedGeneralInfo = stepLabel ? stepData?.[stepLabel] : null

  const {
    data,
    errors,
    handleBlur,
    handleDataChange,
    handleInputChange,
    handleNonInputValueChange
  } = useForm({
    initialValues: savedGeneralInfo?.data ?? initialValues,
    initialErrors: savedGeneralInfo?.errors,
    validations
  })

  const handleUserResponse = useCallback(
    (user) => {
      void (async () => {
        const countryName = user.address?.country ?? null
        const cityName = user.address?.city ?? null

        const { countryCode, state, stateCode } = await resolveLocationCodes(
          countryName,
          cityName
        )

        handleDataChange({
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          country: countryName,
          countryCode,
          state,
          stateCode,
          city: cityName,
          professionalSummary: user.professionalSummary ?? ''
        })

        setIsUserFetched(true)
      })()
    },
    [handleDataChange, setIsUserFetched]
  )

  const getUser = useCallback(
    () => userService.getUserById(userId, userRole),
    [userId, userRole]
  )

  const { fetchData } = useAxios({
    service: getUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleUserResponse
  })

  useEffect(() => {
    if (!isUserFetched && !isFetchStarted.current && userId && userRole) {
      isFetchStarted.current = true
      void fetchData()
    }
  }, [fetchData, isUserFetched, userId, userRole])

  useEffect(() => {
    handleStepData(stepLabel, data, errors)
  }, [data, errors, handleStepData, stepLabel])

  const getStates = useCallback(
    () => locationService.getStates(data.countryCode),
    [data.countryCode]
  )

  const getCities = useCallback(
    () => locationService.getCities(data.countryCode, data.stateCode),
    [data.countryCode, data.stateCode]
  )

  const handleCountryChange = (_, value) => {
    handleNonInputValueChange('country', value?.name ?? null)
    handleNonInputValueChange('countryCode', value?.iso2 ?? null)
    handleNonInputValueChange('state', null)
    handleNonInputValueChange('stateCode', null)
    handleNonInputValueChange('city', null)
  }

  const handleStateChange = (_, value) => {
    handleNonInputValueChange('state', value?.name ?? null)
    handleNonInputValueChange('stateCode', value?.iso2 ?? null)
    handleNonInputValueChange('city', null)
  }

  const handleCityChange = (_, value) => {
    handleNonInputValueChange('city', value?.name ?? null)
  }

  const handleNameBlur = (field) => (event) => {
    const trimmedValue = event.target.value.trim()

    handleNonInputValueChange(field, trimmedValue)
    handleBlur(field)({
      ...event,
      target: {
        ...event.target,
        value: trimmedValue
      }
    })
  }

  const getError = (error) => (error ? t(error) : '')

  return (
    <StepLayout
      btnsBox={btnsBox}
      hint={t('becomeTutor.generalInfo.helperText')}
      imgSrc={img}
      title={t('becomeTutor.generalInfo.title')}
    >
      <Box sx={styles.nameFields}>
        <AppTextField
          autoFocus
          errorMsg={getError(errors.firstName)}
          label={t('becomeTutor.generalInfo.firstNameLabel')}
          onBlur={handleNameBlur('firstName')}
          onChange={handleInputChange('firstName')}
          value={data.firstName}
          withHelperText={Boolean(errors.firstName)}
        />

        <AppTextField
          errorMsg={getError(errors.lastName)}
          label={t('becomeTutor.generalInfo.lastNameLabel')}
          onBlur={handleNameBlur('lastName')}
          onChange={handleInputChange('lastName')}
          value={data.lastName}
          withHelperText={Boolean(errors.lastName)}
        />
      </Box>

      <Box sx={styles.locationFields}>
        <AsyncAutocomplete
          fetchOnFocus={false}
          labelField='name'
          onChange={handleCountryChange}
          service={locationService.getCountries}
          textFieldProps={{
            label: t('becomeTutor.generalInfo.countryLabel')
          }}
          value={data.country}
          valueField='name'
        />

        <AsyncAutocomplete
          disabled={!data.countryCode}
          fetchCondition={Boolean(data.countryCode)}
          fetchOnFocus={false}
          labelField='name'
          onChange={handleStateChange}
          service={getStates}
          textFieldProps={{
            label: t('becomeTutor.generalInfo.stateLabel')
          }}
          value={data.state}
          valueField='name'
        />

        <AsyncAutocomplete
          disabled={!data.stateCode}
          fetchCondition={Boolean(data.stateCode)}
          fetchOnFocus={false}
          labelField='name'
          onChange={handleCityChange}
          service={getCities}
          textFieldProps={{
            label: t('becomeTutor.generalInfo.cityLabel')
          }}
          value={data.city}
          valueField='name'
        />
      </Box>

      <AppTextArea
        errorMsg={getError(errors.professionalSummary)}
        fullWidth
        maxLength={200}
        maxRows={3}
        minRows={3}
        onBlur={handleBlur('professionalSummary')}
        onChange={handleInputChange('professionalSummary')}
        placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
        sx={styles.textArea}
        textFieldStyles={styles.textAreaInput}
        value={data.professionalSummary}
      />
    </StepLayout>
  )
}

export default GeneralInfoStep
