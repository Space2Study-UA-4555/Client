import { FC } from 'react'

import { SxProps } from '@mui/material'

import AppSelect from '~/components/app-select/AppSelect'
import { sortFields } from '~/containers/find-offer/offer-sort-menu/OfferSortMenu.constants'

import { SortByEnum } from '~/types'

interface OfferSortMenuProps {
  sort: SortByEnum
  setSort: (value: SortByEnum) => void
  sx?: SxProps
}

const OfferSortMenu: FC<OfferSortMenuProps> = ({ sort, setSort, sx }) => {
  return (
    <AppSelect
      fields={sortFields}
      selectTitle='common.labels.sortBy'
      setValue={setSort}
      sx={sx}
      value={sort}
    />
  )
}

export default OfferSortMenu
