import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import icon from '~/assets/img/find-offer/subject_icon.png'
import TitleBlock from '~/components/title-block/TitleBlock'
import AppButton from '~/components/app-button/AppButton'
import AppDrawer from '~/components/app-drawer/AppDrawer'
import CreateOfferDrawer from '~/containers/find-offer/create-offer-drawer/CreateOfferDrawer'
import useBreakpoints from '~/hooks/use-breakpoints'
import { useDrawer } from '~/hooks/use-drawer'
import { useAppSelector } from '~/hooks/use-redux'
import { translationKey } from '~/containers/find-offer/constants'
import { styles } from '~/containers/find-offer/offer-request-block/OfferRequestBlock.styles'

const OfferRequestBlock = () => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { userRole } = useAppSelector((state) => state.appMain)

  const handleOpenDrawer = () => {
    openDrawer()
  }

  return (
    <>
      <TitleBlock img={icon} translationKey={translationKey}>
        <AppButton
          fullWidth={isMobile}
          onClick={handleOpenDrawer}
          sx={styles.button}
        >
          {t(`${translationKey}.button.${userRole}`)}
        </AppButton>
      </TitleBlock>

      <AppDrawer
        ModalProps={{
          sx: styles.drawerModal,
          BackdropProps: {
            sx: styles.drawerBackdrop
          }
        }}
        PaperProps={{
          sx: styles.drawerPaper
        }}
        onClose={closeDrawer}
        open={isOpen}
      >
        <Box>
          <CreateOfferDrawer onClose={closeDrawer} onCreated={closeDrawer} />
        </Box>
      </AppDrawer>
    </>
  )
}

export default OfferRequestBlock
