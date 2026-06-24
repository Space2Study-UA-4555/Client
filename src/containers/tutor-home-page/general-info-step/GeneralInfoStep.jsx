import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppSelect from '~/components/app-select/AppSelect'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import { getCountries, getStates, getCities } from '~/services/locationApi'
import { useStepContext } from '~/context/step-context'

import { styles } from './GeneralInfoStep.styles'

const NAME_MAX = 30
const STATUS_MAX = 200

const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄє]+(?: [A-Za-zА-Яа-яЁёІіЇїЄє]+)*$/

const GeneralInfoStep = ({ btnsBox }) => {
  const { stepData, handleStepData } = useStepContext()

  const initial = stepData?.generalInfo?.data || {}

  const [firstName, setFirstName] = useState(initial.firstName || '')
  const [lastName, setLastName] = useState(initial.lastName || '')
  const [country, setCountry] = useState(initial.country || '')
  const [state, setState] = useState(initial.state || '')
  const [city, setCity] = useState(initial.city || '')
  const [status, setStatus] = useState(initial.professionalSummary || '')

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const [errors, setErrors] = useState({
    firstName: null,
    lastName: null,
    country: null,
    state: null,
    city: null,
    status: null
  })

  const firstNameRef = useRef(null)

  useEffect(() => {
    firstNameRef.current?.focus()
  }, [])

  const validateName = (value) => {
    const trimmed = value.trim()

    if (!trimmed) return 'This field cannot be empty'
    if (trimmed.length > NAME_MAX)
      return 'This field cannot be longer than 30 characters'
    if (!nameRegex.test(trimmed))
      return 'This field can contain alphabetic characters only'

    return null
  }

  const validateStatus = (value) => {
    if (!value.trim()) return 'This field cannot be empty'
    if (value.length > STATUS_MAX) return 'Too long'
    return null
  }

  const validateAll = () => {
    const newErrors = {
      firstName: validateName(firstName),
      lastName: validateName(lastName),
      country: country ? null : 'Please select a country',
      state: state ? null : 'Please select a state',
      city: city ? null : 'Please select a city',
      status: validateStatus(status)
    }

    setErrors(newErrors)
  }

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const res = await getCountries()
        if (cancelled) return

        const data = res.data
        setCountries(
          data.map((c) => ({
            title: c.name,
            value: c.iso2
          }))
        )
      } catch (e) {
        if (cancelled) return
        console.error('Failed to load countries', e)
        setCountries([])
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    if (!country) {
      setStates([])
      setState('')
      setCities([])
      setCity('')
      return
    }

    const load = async () => {
      try {
        const res = await getStates(country)
        if (cancelled) return

        const data = res.data
        setStates(
          data.map((s) => ({
            title: s.name,
            value: s.iso2
          }))
        )
      } catch (e) {
        if (cancelled) return
        console.error('Failed to load states', e)
        setStates([])
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [country])

  useEffect(() => {
    let cancelled = false

    if (!country || !state) {
      setCities([])
      setCity('')
      return
    }

    const load = async () => {
      try {
        const res = await getCities(country, state)
        if (cancelled) return

        const data = res.data
        setCities(
          data.map((c) => ({
            title: c.name,
            value: c.name
          }))
        )
      } catch (e) {
        if (cancelled) return
        console.error('Failed to load cities', e)
        setCities([])
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [country, state])

  useEffect(() => {
    handleStepData('generalInfo', {
      firstName,
      lastName,
      country,
      state,
      city,
      professionalSummary: status
    })
  }, [firstName, lastName, country, state, city, status, handleStepData])

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
        }}
        value={lastName}
      />

      <AppSelect
        fields={countries}
        label='Country'
        selectTitle='Select country'
        setValue={(v) => {
          setCountry(v)
          setState('')
          setCity('')
          setErrors((prev) => ({
            ...prev,
            country: null,
            state: null,
            city: null
          }))
        }}
        value={country}
      />

      <AppSelect
        disabled={!country}
        fields={states}
        label='State'
        selectTitle='Select state'
        setValue={(v) => {
          setState(v)
          setCity('')
          setErrors((prev) => ({ ...prev, state: null, city: null }))
        }}
        value={state}
      />

      <AppSelect
        data-testid='city-select'
        disabled={!state}
        fields={cities}
        label='City'
        selectTitle='Select city'
        setValue={(v) => {
          setCity(v)
          setErrors((prev) => ({ ...prev, city: null }))
        }}
        value={city}
      />

      <AppTextArea
        errorMsg={errors.status}
        maxLength={STATUS_MAX}
        onChange={(e) => {
          const v = e.target.value
          setStatus(v)
          const err = validateStatus(v)
          setErrors((prev) => ({ ...prev, status: err }))
        }}
        title='Describe in short your professional status'
        value={status}
      />

      <Box onClick={validateAll} sx={{ mt: 3 }}>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
