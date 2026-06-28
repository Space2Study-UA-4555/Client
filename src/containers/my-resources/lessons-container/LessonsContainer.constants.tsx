import ListAltIcon from '@mui/icons-material/ListAlt'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import AppChip from '~/components/app-chip/AppChip'

import {
  AdditionalPropsInterface,
  Lesson,
  RemoveColumnRules,
  SortEnum,
  TableColumn
} from '~/types'
import { createUrlPath, getFormattedDate } from '~/utils/helper-functions'
import { styles } from '~/containers/my-resources/lessons-container/LessonsContainer.styles'
import { authRoutes } from '~/router/constants/authRoutes'

export const columns: TableColumn<Lesson>[] = [
  {
    label: 'myResourcesPage.lessons.title',
    field: 'title',
    calculatedCellValue: (
      item: Lesson,
      { navigate }: AdditionalPropsInterface
    ) => {
      const handleClick = () => {
        navigate(createUrlPath(authRoutes.myResources.lesson.path, item._id))
      }
      return (
        <Box onClick={handleClick} sx={styles.titleContainer}>
          <IconExtensionWithTitle icon={<ListAltIcon />} title={item.title} />
        </Box>
      )
    }
  },
  {
    label: 'myResourcesPage.lessons.filesLabel',
    field: 'attachments',
    calculatedCellValue: (item: Lesson, { t }: AdditionalPropsInterface) => (
      <Typography sx={styles.files}>
        {t('myResourcesPage.lessons.filesCount', {
          number: item.attachments?.length ?? 0
        })}
      </Typography>
    )
  },
  {
    label: 'myResourcesPage.categories.category',
    field: 'category',
    calculatedCellValue: (item: Lesson, { t }: AdditionalPropsInterface) =>
      item.category ? (
        <AppChip labelSx={styles.categoryChipLabel} sx={styles.categoryChip}>
          {item.category.name}
        </AppChip>
      ) : (
        <Typography sx={styles.date}>
          {t('myResourcesPage.categories.noCategory')}
        </Typography>
      )
  },
  {
    label: 'myResourcesPage.lessons.lastUpdates',
    field: 'updatedAt',
    calculatedCellValue: (item: Lesson) => (
      <Typography sx={styles.date}>
        {getFormattedDate({ date: item.updatedAt })}
      </Typography>
    )
  }
]

export const removeColumnRules: RemoveColumnRules<Lesson> = {
  tablet: ['myResourcesPage.lessons.lastUpdates']
}

export const initialSort = { order: SortEnum.Desc, orderBy: 'updatedAt' }

export const itemsLoadLimit = {
  default: 10,
  tablet: 8,
  mobile: 6
}
