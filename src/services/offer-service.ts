import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { GetOffersParams, ItemsWithCount, Offer } from '~/types'

export const offerService = {
  getOffers: (
    params?: GetOffersParams
  ): Promise<AxiosResponse<ItemsWithCount<Offer>>> => {
    return axiosClient.get(URLs.offers.get, { params })
  }
}
