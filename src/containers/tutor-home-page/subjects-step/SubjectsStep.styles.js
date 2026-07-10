import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    flex: { xs: 1, sm: 'unset' },
    width: '100%',
    ...fadeAnimation
  },
  imgContainer: {
    display: { xs: 'none', sm: 'flex' },
    flex: 1,
    maxWidth: '432px',
    pb: { sm: '52px' }
  },
  img: {
    width: '100%'
  },
  mobileImgContainer: {
    display: { xs: 'flex', sm: 'none' },
    justifyContent: 'center'
  },
  mobileImg: {
    width: '100%',
    maxWidth: '220px',
    maxHeight: '220px',
    objectFit: 'contain'
  },
  rightBox: {
    maxWidth: '432px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: { xs: 1, sm: 'unset' },
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
  },
  btnsBox: {
    pb: { xs: '24px', sm: 0 }
  }
}
