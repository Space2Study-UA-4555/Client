import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import { ExpandMoreRounded } from '@mui/icons-material'
import Accordions from '~/components/accordion/Accordions'
import { accordionItems } from './accordionItems'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { studentRoutes } from '~/router/constants/studentRoutes'

import { styles } from '~/containers/student-home-page/faq/Faq.styles'
import { TypographyVariantEnum } from '~/types'

const Faq = () => {
  const { t } = useTranslation()
  const [activeItemId, setActiveItemId] = useState<number | null>(null)

  return (
    <Box
      className='section'
      id={studentRoutes.navBar.faq.route}
      sx={styles.container}
    >
      <TitleWithDescription
        description={t('studentHomePage.faq.subtitle')}
        style={styles.titleWithDescription}
        title={t('studentHomePage.faq.title')}
      />

      <Accordions
        activeIndex={activeItemId}
        descriptionVariant={TypographyVariantEnum.Body2}
        icon={<ExpandMoreRounded />}
        items={accordionItems}
        onChange={(id) =>
          setActiveItemId((activeId) => (activeId === id ? null : id))
        }
        titleVariant={TypographyVariantEnum.H6}
      />
    </Box>
  )
}

export default Faq
