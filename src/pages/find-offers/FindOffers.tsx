import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import OfferSearchToolbar from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar'
import OffersToggle from '~/containers/find-offer/offers-toggle/OffersToggle'
import { useAppSelector } from '~/hooks/use-redux'
import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from '~/pages/find-offers/FindOffers.styles'
import { SizeEnum, UserRoleEnum, ViewModeEnum } from '~/types'

const FindOffers = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const [searchParams, setSearchParams] = useSearchParams()

  const [isTutorsOffers, setIsTutorsOffers] = useState(
    userRole !== UserRoleEnum.Tutor
  )
  const [viewMode, setViewMode] = useState<ViewModeEnum>(ViewModeEnum.Inline)

  return (
    <PageWrapper>
      <OfferRequestBlock />
      <TitleWithDescription
        description={t('findOffers.titleWithDescription.description')}
        style={styles.titleWithDescription}
        title={t('findOffers.titleWithDescription.title')}
      />
      <Box sx={styles.navigation}>
        <DirectionLink
          before={<ArrowBackIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.categories.path}
          title={t('subjectsPage.subjects.backToAllCategories')}
        />
      </Box>
      <OfferSearchToolbar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Box sx={styles.listToolbar}>
        <OffersToggle
          isTutorsOffers={isTutorsOffers}
          setIsTutorsOffers={setIsTutorsOffers}
        />
        <AppViewSwitcher activeView={viewMode} onChange={setViewMode} />
      </Box>
    </PageWrapper>
  )
}

export default FindOffers
