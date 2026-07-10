import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
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
    m: { xs: '0 auto', md: 0 },
    pt: { sm: '20px' }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  nameFields: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: '16px'
  },
  locationFields: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
    gap: '16px',
    '& > *:last-child': {
      gridColumn: { sm: '1 / -1' }
    }
  },
  title: {
    typography: 'body1',
    color: 'primary.700'
  },
  textArea: {
    width: '100%'
  },
  textAreaInput: {
    width: '100%'
  },
  helperText: {
    typography: 'body2',
    color: 'primary.700'
  },
  btnsBox: {
    pb: { xs: '24px', sm: 0 }
  }
}
