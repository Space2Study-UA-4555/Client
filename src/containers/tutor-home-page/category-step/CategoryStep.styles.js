import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    gap: { xs: '40px', md: '120px' },
    height: { sm: '485px' },
    ...fadeAnimation
  },

  imgContainer: {
    display: 'flex',
    flex: 1,
    maxWidth: '432px',
    alignItems: 'flex-start',
    pb: { xs: '16px', sm: '52px' }
  },

  img: {
    width: '100%',
    m: { sm: 0, xs: '0 auto' }
  },

  rightBox: {
    maxWidth: '432px',
    width: '100%',
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
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '100%',
    letterSpacing: '0.15px',
    color: '#263238',
    marginBottom: '16px'
  }
}
