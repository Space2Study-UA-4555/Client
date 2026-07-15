import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppButton from '~/components/app-button/AppButton'
import CategoryCard from '~/components/category-card/CategoryCard'
import Loader from '~/components/loader/Loader'
import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'
import { categoryService } from '~/services/category-service'
import { authRoutes } from '~/router/constants/authRoutes'
import { getOpositeRole } from '~/utils/helper-functions'

import { defaultResponses } from '~/constants'
import { styles } from '~/containers/find-offer/popular-categories/PopularCategories.styles'
import {
  ButtonVariantEnum,
  CategoryInterface,
  ItemsWithCount,
  TypographyVariantEnum
} from '~/types'

const itemsLimit = 9

const PopularCategories = () => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)

  const getCategories = useCallback(
    () => categoryService.getCategories({ limit: itemsLimit }),
    []
  )

  const { loading, response, error } = useAxios<
    ItemsWithCount<CategoryInterface>
  >({
    service: getCategories,
    defaultResponse: defaultResponses.itemsWithCount
  })

  const oppositeRole = getOpositeRole(userRole)

  const cards = error ? (
    <Typography data-testid='categories-error'>
      {t('findOffers.popularCategories.error')}
    </Typography>
  ) : (
    response.items.map((category) => (
      <CategoryCard
        color={category.appearance.color}
        description={`${category.totalOffers[oppositeRole]} ${t(
          'categoriesPage.offers'
        )}`}
        icon={category.appearance.icon}
        key={category._id}
        link={`${authRoutes.subjects.path}?categoryId=${category._id}`}
        title={category.name}
      />
    ))
  )

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title} variant={TypographyVariantEnum.H5}>
        {t('common.popularCategories')}
      </Typography>
      {loading ? (
        <Box sx={styles.loaderContainer}>
          <Loader size={40} />
        </Box>
      ) : (
        <Box sx={styles.cardsContainer}>{cards}</Box>
      )}
      <AppButton
        component={Link}
        sx={styles.viewAllBtn}
        to={authRoutes.categories.path}
        variant={ButtonVariantEnum.Tonal}
      >
        {t('findOffers.viewAllCategories')}
      </AppButton>
    </Box>
  )
}

export default PopularCategories
