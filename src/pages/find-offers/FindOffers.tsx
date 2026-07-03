import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppButton from '~/components/app-button/AppButton'
import AppViewSwitcher from '~/components/app-view-switcher/AppViewSwitcher'
import Loader from '~/components/loader/Loader'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'
import OfferContainer from '~/containers/find-offer/offer-container/OfferContainer'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import OfferSearchToolbar from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar'
import OfferSortMenu from '~/containers/find-offer/offer-sort-menu/OfferSortMenu'
import OffersToggle from '~/containers/find-offer/offers-toggle/OffersToggle'
import useBreakpoints from '~/hooks/use-breakpoints'
import useLoadMore from '~/hooks/use-load-more'
import { useAppSelector } from '~/hooks/use-redux'
import { offerService } from '~/services/offer-service'
import { authRoutes } from '~/router/constants/authRoutes'
import { getScreenBasedLimit } from '~/utils/helper-functions'

import { itemsLoadLimit } from '~/constants'
import { styles } from '~/pages/find-offers/FindOffers.styles'
import {
  ButtonVariantEnum,
  GetOffersParams,
  Offer,
  SizeEnum,
  SortByEnum,
  UserRoleEnum,
  ViewModeEnum
} from '~/types'

const FindOffers = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const [searchParams, setSearchParams] = useSearchParams()
  const breakpoints = useBreakpoints()

  const [isTutorsOffers, setIsTutorsOffers] = useState(
    userRole !== UserRoleEnum.Tutor
  )
  const [viewMode, setViewMode] = useState<ViewModeEnum>(ViewModeEnum.Inline)
  const [sort, setSort] = useState<SortByEnum>(SortByEnum.Newest)

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)

  const authorRole = isTutorsOffers ? UserRoleEnum.Tutor : UserRoleEnum.Student
  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''
  const search = searchParams.get('search') ?? ''

  const params = useMemo<GetOffersParams>(
    () => ({
      authorRole,
      sort,
      ...(categoryId && { categoryId }),
      ...(subjectId && { subjectId }),
      ...(search && { search })
    }),
    [authorRole, sort, categoryId, subjectId, search]
  )

  const getOffers = useCallback(
    (getParams?: GetOffersParams) => offerService.getOffers(getParams),
    []
  )

  const {
    data: offers,
    loading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<Offer, GetOffersParams>({
    service: getOffers,
    limit: cardsLimit,
    params
  })

  const onToggleChange = (value: boolean) => {
    resetData()
    setIsTutorsOffers(value)
  }

  const onSortChange = (value: SortByEnum) => {
    resetData()
    setSort(value)
  }

  const onSearchParamsChange = (value: URLSearchParams) => {
    resetData()
    setSearchParams(value)
  }

  const onBookmarkClick = () => undefined

  const offersList =
    !offers.length && !loading ? (
      <NotFoundResults description={t('findOffers.notFound.description')} />
    ) : (
      <>
        {loading && !offers.length ? (
          <Box sx={styles.loaderContainer}>
            <Loader pageLoad size={50} />
          </Box>
        ) : (
          <OfferContainer
            offers={offers}
            onBookmarkClick={onBookmarkClick}
            viewMode={viewMode}
          />
        )}
        {isExpandable && (
          <AppButton
            loading={loading}
            onClick={loadMore}
            size={SizeEnum.ExtraLarge}
            sx={styles.viewMoreBtn}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('categoriesPage.viewMore')}
          </AppButton>
        )}
      </>
    )

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
        setSearchParams={onSearchParamsChange}
      />
      <Box sx={styles.listToolbar}>
        <OffersToggle
          isTutorsOffers={isTutorsOffers}
          setIsTutorsOffers={onToggleChange}
        />
        <Box sx={styles.listToolbarRight}>
          <OfferSortMenu setSort={onSortChange} sort={sort} />
          <AppViewSwitcher activeView={viewMode} onChange={setViewMode} />
        </Box>
      </Box>
      {offersList}
    </PageWrapper>
  )
}

export default FindOffers
