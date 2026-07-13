import { axiosClient } from '~/plugins/axiosClient'

export const getCountries = async () => {
  return axiosClient.get('/locations/countries')
}

export const getStates = async (countryCode: string) => {
  return axiosClient.get('/locations/states', {
    params: { countryCode }
  })
}

export const getCities = async (countryCode: string, stateCode: string) => {
  return axiosClient.get('/locations/cities', {
    params: { countryCode, stateCode }
  })
}
