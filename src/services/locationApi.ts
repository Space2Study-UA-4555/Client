import axios from 'axios'

export const getCountries = () => {
  return axios.get('/locations/countries')
}

export const getCities = (countryCode: string) => {
  return axios.get(`/locations/cities?countryCode=${countryCode}`)
}
