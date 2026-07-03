import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import TurnedIn from '@mui/icons-material/TurnedIn'
import { SxProps } from '@mui/material'

import AppCard from '~/components/app-card/AppCard'
import AppButton from '~/components/app-button/AppButton'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import SubjectLevelChips from '~/components/subject-level-chips/SubjectLevelChips'
import LanguagesListWithIcon from '~/components/languages-list-with-icon/LanguagesListWithIcon'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/offer-card/OfferCard.styles'
import { ButtonActions, Offer, TypographyVariantEnum } from '~/types'

interface OfferCardProps {
  offer: Offer
  onBookmarkClick: (id: string) => void
  buttonActions?: (ButtonActions | null)[]
  isBookmarked?: boolean
  sx?: SxProps
}

const OfferCard: FC<OfferCardProps> = ({
  offer,
  onBookmarkClick,
  buttonActions,
  isBookmarked = false,
  sx
}) => {
  const { t } = useTranslation()
  const { author, authorRole, title, description, languages, price, subject } =
    offer

  const buttons = buttonActions?.map(
    (action) =>
      action && (
        <AppButton fullWidth key={action.label} {...action.buttonProps}>
          {action.label}
        </AppButton>
      )
  )

  return (
    <AppCard data-testid='offer-card' sx={spliceSx(styles.container, sx)}>
      <UserProfileInfo
        _id={author._id}
        firstName={author.firstName}
        lastName={`${author.lastName.charAt(0)}.`}
        photo={author.photo}
        rating={author.averageRating[authorRole]}
        reviewsCount={author.totalReviews[authorRole]}
        role={authorRole}
        sx={styles.userInfo}
      />
      <Box sx={styles.content}>
        <Typography sx={styles.title} variant={TypographyVariantEnum.H6}>
          {title}
        </Typography>
        <SubjectLevelChips
          proficiencyLevel={offer.proficiencyLevel}
          subject={subject.name}
          sx={styles.chips}
        />
        <Typography sx={styles.description}>{description}</Typography>
        <LanguagesListWithIcon languages={languages} />
      </Box>
      <Box sx={styles.side}>
        <Box sx={styles.priceBlock}>
          <Box>
            <Typography sx={styles.price} variant={TypographyVariantEnum.H6}>
              {`${price} ${t('common.uah')}`}
            </Typography>
            <Typography sx={styles.hour}>{`/${t('common.hour')}`}</Typography>
          </Box>
          <IconButton
            data-testid='bookmark-button'
            onClick={() => onBookmarkClick(offer._id)}
            sx={styles.bookmarkButton}
          >
            {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
          </IconButton>
        </Box>
        <Box sx={styles.buttons}>{buttons}</Box>
      </Box>
    </AppCard>
  )
}

export default OfferCard
