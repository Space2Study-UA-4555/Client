import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

import { styles } from './CategoryOption.styles'

const CategoryOption = ({ option }) => {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title}>{option.name}</Typography>
    </Box>
  )
}

CategoryOption.propTypes = {
  option: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  }).isRequired
}

export default CategoryOption
