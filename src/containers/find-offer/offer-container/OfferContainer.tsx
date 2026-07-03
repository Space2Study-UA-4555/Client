import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import OfferCard from '~/components/offer-card/OfferCard'
import OfferCardSquare from '~/components/offer-card-square/OfferCardSquare'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/find-offer/offer-container/OfferContainer.styles'
import { ButtonActions, Offer, ViewModeEnum } from '~/types'

interface OfferContainerProps {
  offers: Offer[]
  viewMode: ViewModeEnum
  onBookmarkClick: (id: string) => void
}

const OfferContainer: FC<OfferContainerProps> = ({
  offers,
  viewMode,
  onBookmarkClick
}) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const isGrid = viewMode === ViewModeEnum.Grid || isMobile

  const buttonActions: ButtonActions[] = [
    { label: t('common.labels.viewDetails'), buttonProps: {} },
    { label: t('common.labels.sendMessage'), buttonProps: {} }
  ]

  const cards = offers.map((offer) =>
    isGrid ? (
      <OfferCardSquare
        buttonActions={buttonActions}
        key={offer._id}
        offer={offer}
        onBookmarkClick={onBookmarkClick}
      />
    ) : (
      <OfferCard
        buttonActions={buttonActions}
        key={offer._id}
        offer={offer}
        onBookmarkClick={onBookmarkClick}
      />
    )
  )

  return (
    <Box
      data-testid='offer-container'
      sx={isGrid ? styles.gridContainer : styles.inlineContainer}
    >
      {cards}
    </Box>
  )
}

export default OfferContainer
