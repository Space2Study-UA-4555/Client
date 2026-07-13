import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { useAppSelector } from '~/hooks/use-redux'
import useCategoriesNames from '~/hooks/use-categories-names'
import useLoadMore from '~/hooks/use-load-more'
import useBreakpoints from '~/hooks/use-breakpoints'

import { categoryService } from '~/services/category-service'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import AppToolbar from '~/components/app-toolbar/AppToolbar'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import CardsList from '~/components/cards-list/CardsList'
import CardWithLink from '~/components/card-with-link/CardWithLink'

import { CategoriesParams, CategoryInterface } from '~/types'
import { itemsLoadLimit } from '~/constants'
import { getOpositeRole, getScreenBasedLimit } from '~/utils/helper-functions'

import { styles } from '~/pages/categories/Categories.styles'
import { authRoutes } from '~/router/constants/authRoutes'

const Categories = () => {
  const [match, setMatch] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const params = useMemo(() => ({ name: match }), [match])

  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const breakpoints = useBreakpoints()

  const cardsLimit = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const oppositeRole = getOpositeRole(userRole)

  const {
    loading: categoriesNamesLoading,
    response: categoriesNamesItems,
    fetchData
  } = useCategoriesNames({
    fetchOnMount: false
  })

  const categoriesOptions = useMemo(
    () => categoriesNamesItems.map((item) => item.name),
    [categoriesNamesItems]
  )

  const getCategoryNames = () => {
    !isFetched && void fetchData()
    setIsFetched(true)
  }

  const getCategories = useCallback(
    (data?: Partial<CategoriesParams>) => categoryService.getCategories(data),
    []
  )

  const {
    data: categories,
    loading: categoriesLoading,
    resetData,
    loadMore,
    isExpandable
  } = useLoadMore<CategoryInterface, Partial<CategoriesParams>>({
    service: getCategories,
    limit: cardsLimit,
    params
  })

  const cards = useMemo(
    () =>
      categories.map((item) => (
        <CardWithLink
          description={`${item.totalOffers[oppositeRole]} ${t(
            'categoriesPage.offers'
          )}`}
          img={item.appearance.icon}
          key={item._id}
          link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
          title={item.name}
        />
      )),
    [categories, oppositeRole, t]
  )

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('categoriesPage.description')}
        style={styles.titleWithDescription}
        title={t('categoriesPage.title')}
      />

      <Box style={styles.navigation}>
        <DirectionLink
          after={<ArrowForwardIcon />}
          linkTo={authRoutes.findOffers.path}
          title={t('categoriesPage.showAllOffers')}
        />
      </Box>

      <AppToolbar sx={styles.searchToolbar}>
        <SearchAutocomplete
          loading={categoriesNamesLoading}
          onFocus={getCategoryNames}
          onSearchChange={resetData}
          options={categoriesOptions}
          search={match}
          setSearch={setMatch}
          textFieldProps={{
            label: t('categoriesPage.searchLabel')
          }}
        />
      </AppToolbar>

      {!categories.length && !categoriesLoading ? (
        <NotFoundResults
          buttonText={t('categoriesPage.requestNewCategory')}
          description={t('categoriesPage.noResultsDescription')}
          onClick={handleOpenModal}
        />
      ) : (
        <CardsList
          btnText={t('categoriesPage.viewMore')}
          cards={cards}
          isExpandable={isExpandable}
          loading={categoriesLoading}
          onClick={loadMore}
        />
      )}
    </PageWrapper>
  )
}

export default Categories
