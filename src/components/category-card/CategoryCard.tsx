import { FC } from 'react'

import Box from '@mui/material/Box'

import AppCard from '~/components/app-card/AppCard'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/category-card/CategoryCard.styles'

interface CategoryCardProps {
  title: string
  description: string
  icon: string
  color: string
  link: string
}

const CategoryCard: FC<CategoryCardProps> = ({
  title,
  description,
  icon,
  color,
  link
}) => {
  return (
    <AppCard data-testid='category-card' link={link} sx={styles.container}>
      <Box sx={styles.iconBox(color)}>
        <Box alt='category icon' component='img' src={icon} sx={styles.icon} />
      </Box>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
    </AppCard>
  )
}

export default CategoryCard
