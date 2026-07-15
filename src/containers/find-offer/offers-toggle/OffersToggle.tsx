import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { SxProps } from '@mui/system'

import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'
import { TypographyVariantEnum } from '~/types'

interface OffersToggleProps {
  isTutorsOffers: boolean
  setIsTutorsOffers: (value: boolean) => void
  styles?: SxProps
}

const OffersToggle: FC<OffersToggleProps> = ({
  isTutorsOffers,
  setIsTutorsOffers,
  styles
}) => {
  const { t } = useTranslation()

  const handleChange = () => {
    setIsTutorsOffers(!isTutorsOffers)
  }

  const switchOptions = {
    left: {
      text: t('findOffers.topMenu.tutorsOffers'),
      tooltip: t('findOffers.contentSwitcher.switcher-tutor')
    },
    right: {
      text: t('findOffers.topMenu.studentsRequests'),
      tooltip: t('findOffers.contentSwitcher.switcher-student')
    }
  }

  return (
    <AppContentSwitcher
      active={!isTutorsOffers}
      onChange={handleChange}
      styles={styles}
      switchOptions={switchOptions}
      typographyVariant={TypographyVariantEnum.Body1}
    />
  )
}

export default OffersToggle
