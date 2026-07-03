import { offerService } from '~/services/offer-service'
import { mockAxiosClient } from '~tests/test-utils'
import { URLs } from '~/constants/request'

const mockResponse = {
  items: [{ _id: '1', title: 'Offer' }],
  count: 1
}

describe('offerService', () => {
  it('should fetch offers with the passed params', async () => {
    mockAxiosClient.onGet(URLs.offers.get).reply(200, mockResponse)

    const params = { authorRole: 'tutor', sort: 'createdAt' }
    const result = await offerService.getOffers(params)

    expect(result.data).toEqual(mockResponse)
    expect(mockAxiosClient.history.get[0].params).toEqual(params)
  })
})
