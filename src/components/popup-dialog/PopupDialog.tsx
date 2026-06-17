import { FC } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'

import useBreakpoints from '~/hooks/use-breakpoints'
import useConfirm from '~/hooks/use-confirm'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
  closeModal: () => void
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModalAfterDelay,
  closeModal
}) => {
  const { isMobile } = useBreakpoints()
  const { checkConfirmation } = useConfirm()

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  const handleClose = async () => {
    const confirmed = await checkConfirmation({
      message: 'common.confirmClose.message',
      title: 'common.confirmClose.title'
    })

    if (confirmed) {
      closeModal()
    }
  }

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        sx={styles.box}
      >
        <IconButton onClick={() => void handleClose()} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>
    </Dialog>
  )
}

export default PopupDialog
