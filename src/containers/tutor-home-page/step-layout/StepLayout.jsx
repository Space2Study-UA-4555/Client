import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { stepLayoutStyles } from '~/containers/tutor-home-page/step-layout/stepLayout.styles'

const StepLayout = ({ btnsBox, children, hint, imgSrc, title }) => (
  <Box sx={stepLayoutStyles.container}>
    <Box sx={stepLayoutStyles.imgContainer}>
      <Box alt='' component='img' src={imgSrc} sx={stepLayoutStyles.img} />
    </Box>

    <Box sx={stepLayoutStyles.rightBox}>
      <Box sx={stepLayoutStyles.header}>
        <Typography sx={stepLayoutStyles.title}>{title}</Typography>

        <Box sx={stepLayoutStyles.mobileImgContainer}>
          <Box
            alt=''
            component='img'
            src={imgSrc}
            sx={stepLayoutStyles.mobileImg}
          />
        </Box>
      </Box>

      <Box sx={stepLayoutStyles.form}>{children}</Box>

      <Box sx={stepLayoutStyles.footer}>
        {hint && <Typography sx={stepLayoutStyles.formHint}>{hint}</Typography>}
        <Box sx={stepLayoutStyles.btnsBox}>{btnsBox}</Box>
      </Box>
    </Box>
  </Box>
)

StepLayout.propTypes = {
  btnsBox: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  hint: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default StepLayout
