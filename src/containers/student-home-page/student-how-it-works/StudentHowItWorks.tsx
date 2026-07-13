import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'
import { Link } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'
import { howItWorksCards } from '~/containers/student-home-page/student-how-it-works/HowItWorksCards'
import { styles } from '~/containers/student-home-page/student-how-it-works/StudentHowItWorks.styles'
import { SizeEnum } from '~/types'

const StudentHowItWorks = () => {
  const { t } = useTranslation()

  const cards = howItWorksCards.map((card) => (
    <Box key={card.title} sx={styles.card}>
      <Box component='img' src={card.image} sx={styles.cardImage} />
      <Typography sx={styles.cardTitle}>{t(card.title)}</Typography>
      <Typography sx={styles.cardDescription}>{t(card.description)}</Typography>
    </Box>
  ))

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>
        {t('studentHomePage.howItWorks.title')}
      </Typography>
      <Typography sx={styles.description}>
        {t('studentHomePage.howItWorks.description')}
      </Typography>
      <Box sx={styles.cardsContainer}>{cards}</Box>
      <AppButton
        component={Link}
        size={SizeEnum.ExtraLarge}
        sx={styles.button}
        to={authRoutes.findOffers.path}
        variant='contained'
      >
        {t('studentHomePage.findTutorBlock.button')}
      </AppButton>
    </Box>
  )
}

export default StudentHowItWorks
