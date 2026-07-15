import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ViewListIcon from '@mui/icons-material/ViewList'
import GridViewIcon from '@mui/icons-material/GridView'
import { SxProps } from '@mui/material'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/app-view-switcher/AppViewSwitcher.styles'
import { ViewModeEnum } from '~/types'

interface AppViewSwitcherProps {
  activeView: ViewModeEnum
  onChange: (view: ViewModeEnum) => void
  sx?: SxProps
}

const AppViewSwitcher: FC<AppViewSwitcherProps> = ({
  activeView,
  onChange,
  sx
}) => {
  const { t } = useTranslation()

  return (
    <Box sx={spliceSx(styles.container, sx)}>
      <IconButton
        aria-label={t('common.labels.inlineView')}
        aria-pressed={activeView === ViewModeEnum.Inline}
        data-testid='inline-view-button'
        onClick={() => onChange(ViewModeEnum.Inline)}
        sx={styles.button(activeView === ViewModeEnum.Inline)}
      >
        <ViewListIcon />
      </IconButton>
      <IconButton
        aria-label={t('common.labels.gridView')}
        aria-pressed={activeView === ViewModeEnum.Grid}
        data-testid='grid-view-button'
        onClick={() => onChange(ViewModeEnum.Grid)}
        sx={styles.button(activeView === ViewModeEnum.Grid)}
      >
        <GridViewIcon />
      </IconButton>
    </Box>
  )
}

export default AppViewSwitcher
