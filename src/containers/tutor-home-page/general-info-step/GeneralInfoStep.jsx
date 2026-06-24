import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppSelect from '~/components/app-select/AppSelect'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import { getCountries, getCities } from '~/services/locationApi'
import useSteps from '~/hooks/use-steps'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const NAME_MAX = 30
const STATUS_MAX = 200

const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄє]+(?: [A-Za-zА-Яа-яЁёІіЇїЄє]+)*$/

const GeneralInfoStep = ({ btnsBox }) => {
  const { stepOperation, activeStep, setStepError } = useSteps()
  const { next } = stepOperation

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [status, setStatus] = useState('')

  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])

  const [errors, setErrors] = useState({})

  const firstNameRef = useRef(null)

  // autofocus
  useEffect(() => {
    firstNameRef.current?.focus()
  }, [])

  // ---------------- VALIDATION ----------------
  const validateName = (value) => {
    const trimmed = value.trim()

    if (!trimmed) return 'This field cannot be empty'
    if (trimmed.length > NAME_MAX)
      return 'This field cannot be longer than 30 characters'
    if (!nameRegex.test(trimmed))
      return 'This field can contain alphabetic characters only'

    return null
  }

  const validateAll = () => {
    const newErrors = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      country: !country ? 'Please select a country' : null,
      city: !city ? 'Please select a city' : null,
      status: status.length > STATUS_MAX ? 'Too long' : null
    }

    setErrors(newErrors)

    const hasError = Object.values(newErrors).some(Boolean)
    setStepError(activeStep, hasError)

    return !hasError
  }

  // ---------------- LOAD COUNTRIES ----------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await getCountries()
        const data = res.data

        setCountries(
          data.map((c) => ({
            title: c.name,
            value: c.iso2
          }))
        )
      } catch (e) {
        console.error('Failed to load countries', e)
      }
    }
    load()
  }, [])

  // ---------------- LOAD CITIES ----------------
  useEffect(() => {
    if (!country) return

    const load = async () => {
      try {
        const res = await getCities(country)
        const data = res.data

        setCities(
          data.map((c) => ({
            title: c.name,
            value: c.name
          }))
        )
      } catch (e) {
        console.error('Failed to load cities', e)
      }
    }
    load()
  }, [country])

  // ---------------- HANDLE NEXT ----------------
  const handleNext = () => {
    if (validateAll()) next()
  }

  return (
    <Box sx={styles.container}>
      <AppTextField
        errorMsg={errors.firstName}
        inputRef={firstNameRef}
        label='First name *'
        onChange={(e) => {
          const v = e.target.value
          setFirstName(v)
          const err = validateName(v)
          setErrors((prev) => ({ ...prev, firstName: err }))
          setStepError(activeStep, Boolean(err))
        }}
        value={firstName}
      />

      <AppTextField
        errorMsg={errors.lastName}
        label='Last name *'
        onChange={(e) => {
          const v = e.target.value
          setLastName(v)
          const err = validateName(v)
          setErrors((prev) => ({ ...prev, lastName: err }))
          setStepError(activeStep, Boolean(err))
        }}
        value={lastName}
      />

      <AppSelect
        fields={countries}
        label='Country'
        selectTitle='Select country'
        setValue={(v) => {
          setCountry(v)
          setCity('')
          setErrors((prev) => ({ ...prev, country: null, city: null }))
          setStepError(activeStep, false)
        }}
        value={country}
      />

      {errors.country && (
        <Box sx={{ color: 'error.main', fontSize: 12, mt: -1, mb: 1 }}>
          {errors.country}
        </Box>
      )}

      <AppSelect
        disabled={!country}
        fields={cities}
        label='City'
        selectTitle='Select city'
        setValue={(v) => {
          setCity(v)
          setErrors((prev) => ({ ...prev, city: null }))
          setStepError(activeStep, false)
        }}
        value={city}
      />

      {errors.city && (
        <Box sx={{ color: 'error.main', fontSize: 12, mt: -1, mb: 1 }}>
          {errors.city}
        </Box>
      )}

      <AppTextArea
        errorMsg={errors.status}
        maxLength={STATUS_MAX}
        onChange={(e) => {
          const v = e.target.value
          setStatus(v)
          const err = v.length > STATUS_MAX ? 'Too long' : null
          setErrors((prev) => ({ ...prev, status: err }))
          setStepError(activeStep, Boolean(err))
        }}
        title='Describe in short your professional status'
        value={status}
      />

      <Box onClick={handleNext} sx={{ mt: 3 }}>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
