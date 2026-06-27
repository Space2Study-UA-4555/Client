import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styles } from './CategoryOption.styles'

const CategoryOption = ({ option }) => {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{option.name}</Typography>
      <Typography sx={styles.subtitle}>Category: {option.name}</Typography>
    </Box>
  )
}

export default CategoryOption
