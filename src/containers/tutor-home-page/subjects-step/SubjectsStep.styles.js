import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    ...fadeAnimation
  },
  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    pb: { sm: '52px' }
  },
  img: {
    width: '100%'
  },
  rigthBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { xs: '0 auto', md: 0 },
    pt: { sm: '20px' }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  title: {
    typography: 'body1',
    color: 'primary.700'
  },
  addSubjectBtn: {
    width: '100%'
  }
}
