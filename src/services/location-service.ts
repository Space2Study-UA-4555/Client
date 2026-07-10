import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import {
  CityNameInterface,
  CountryNameInterface,
  StateNameInterface
} from '~/types'

export const locationService = {
  getCountries: (): Promise<AxiosResponse<CountryNameInterface[]>> => {
    return axiosClient.get(URLs.locations.countries)
  },
  getStates: (
    countryCode: string
  ): Promise<AxiosResponse<StateNameInterface[]>> => {
    return axiosClient.get(URLs.locations.states, {
      params: { countryCode }
    })
  },
  getCities: (
    countryCode: string,
    stateCode: string
  ): Promise<AxiosResponse<CityNameInterface[]>> => {
    return axiosClient.get(URLs.locations.cities, {
      params: { countryCode, stateCode }
    })
  }
}
