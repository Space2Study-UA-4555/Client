export const styles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: 0, sm: '80px' },
    width: '100%'
  },
  imgWrapper: {
    display: { xs: 'none', sm: 'none', md: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 auto'
  },
  img: {
    maxWidth: { md: '280px' },
    width: '100%',
    objectFit: 'contain'
  },
  imgMobile: {
    display: { xs: 'flex', sm: 'none' },
    justifyContent: 'center',
    mb: '16px',
    '& img': {
      maxWidth: '200px',
      width: '100%'
    }
  },
  rightContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '24px'
  },
  description: {
    typography: { xs: 'body2', sm: 'body1' },
    color: 'text.secondary'
  }
}
