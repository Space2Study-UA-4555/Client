import { SelectFieldType, SortByEnum } from '~/types'

export const sortFields: SelectFieldType<SortByEnum>[] = [
  { title: 'findOffers.sortTitles.newest', value: SortByEnum.Newest },
  { title: 'findOffers.sortTitles.rating', value: SortByEnum.Rating },
  { title: 'findOffers.sortTitles.priceAsc', value: SortByEnum.PriceAsc },
  { title: 'findOffers.sortTitles.priceDesc', value: SortByEnum.PriceDesc }
]
