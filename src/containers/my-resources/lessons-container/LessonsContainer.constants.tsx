import { Link as RouterLink } from 'react-router-dom'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

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
    calculatedCellValue: (item: Lesson) => (
      <Link
        component={RouterLink}
        sx={styles.titleContainer}
        to={createUrlPath(authRoutes.myResources.lesson.path, item._id)}
      >
        <IconExtensionWithTitle icon={<ListAltIcon />} title={item.title} />
      </Link>
    )
  },
  {
    label: 'myResourcesPage.lessons.filesLabel',
    field: 'attachments',
    calculatedCellValue: (item: Lesson, { t }: AdditionalPropsInterface) => (
      <Typography sx={styles.files}>
        {t('myResourcesPage.lessons.filesCount', {
          count: item.attachments?.length ?? 0
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
