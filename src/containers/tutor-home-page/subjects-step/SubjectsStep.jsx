import Box from '@mui/material/Box'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import CategoryStep from '../category-step/CategoryStep'

const SubjectsStep = ({ btnsBox }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.rigthBox}>
        <CategoryStep btnsBox={btnsBox} stepLabel='subjects' />
      </Box>
    </Box>
  )
}

export default SubjectsStep
