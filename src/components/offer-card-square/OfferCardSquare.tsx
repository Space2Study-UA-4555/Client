import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import TurnedIn from '@mui/icons-material/TurnedIn'
import { SxProps } from '@mui/material'

import AppCard from '~/components/app-card/AppCard'
import AppButton from '~/components/app-button/AppButton'
import AppRatingMobile from '~/components/app-rating-mobile/AppRatingMobile'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import SubjectLevelWithLabels from '~/components/subject-level-with-labels/SubjectLevelWithLabels'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/offer-card-square/OfferCardSquare.styles'
import { ButtonActions, Offer, TypographyVariantEnum } from '~/types'

interface OfferCardSquareProps {
  offer: Offer
  onBookmarkClick: (id: string) => void
  buttonActions?: (ButtonActions | null)[]
  isBookmarked?: boolean
  sx?: SxProps
}

const OfferCardSquare: FC<OfferCardSquareProps> = ({
  offer,
  onBookmarkClick,
  buttonActions,
  isBookmarked = false,
  sx
}) => {
  const { t } = useTranslation()
  const { author, authorRole, title, languages, price, subject } = offer

  const buttons = buttonActions?.map(
    (action) =>
      action && (
        <AppButton fullWidth key={action.label} {...action.buttonProps}>
          {action.label}
        </AppButton>
      )
  )

  return (
    <AppCard
      data-testid='offer-card-square'
      sx={spliceSx(styles.container, sx)}
    >
      <Box sx={styles.header}>
        <UserProfileInfo
          _id={author._id}
          firstName={author.firstName}
          languages={languages}
          lastName={author.lastName}
          photo={author.photo}
          role={authorRole}
          sx={styles.userInfo}
        />
        <IconButton
          aria-label={
            isBookmarked
              ? t('common.labels.removeBookmark')
              : t('common.labels.addBookmark')
          }
          data-testid='bookmark-button'
          onClick={() => onBookmarkClick(offer._id)}
          sx={styles.bookmarkButton}
        >
          {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
        </IconButton>
      </Box>
      <Typography sx={styles.title} variant={TypographyVariantEnum.H6}>
        {title}
      </Typography>
      <Divider sx={styles.divider} />
      <SubjectLevelWithLabels
        proficiencyLevel={offer.proficiencyLevel}
        subject={subject.name}
        sx={styles.subjectLevel}
      />
      <Box sx={styles.priceRow}>
        <Box>
          <Typography sx={styles.price} variant={TypographyVariantEnum.H6}>
            {`${price} ${t('common.uah')}`}
          </Typography>
          <Typography sx={styles.hour}>{`/${t('common.hour')}`}</Typography>
        </Box>
        <AppRatingMobile
          reviewsCount={author.totalReviews[authorRole]}
          value={author.averageRating[authorRole]}
        />
      </Box>
      <Box sx={styles.buttons}>{buttons}</Box>
    </AppCard>
  )
}

export default OfferCardSquare
