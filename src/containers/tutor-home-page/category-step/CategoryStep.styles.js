import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0px' },
    ...fadeAnimation
  },

  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    alignItems: 'center',
    pb: { xs: '16px', sm: '52px' }
  },

  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },

  rightBox: {
    maxWidth: '432px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    m: { xs: '0 auto', md: 0 },
    pt: 0
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '420px'
  },

  title: {
    fontSize: '24px',
    fontWeight: 600,
    mb: '8px'
  }
}
