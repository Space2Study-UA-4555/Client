export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    maxWidth: '360px',
    p: '25px 20px',
    textDecoration: 'none'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  userInfo: {
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '16px'
    },
    avatar: {
      height: '80px',
      width: '80px'
    },
    name: {
      typography: 'h6',
      color: 'primary.700'
    }
  },
  bookmarkButton: {
    color: 'primary.900',
    p: '4px'
  },
  title: {
    color: 'primary.900',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  divider: {
    borderColor: 'primary.100'
  },
  subjectLevel: {
    container: {
      display: 'flex',
      gap: '10px'
    }
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  price: {
    color: 'primary.900'
  },
  hour: {
    color: 'primary.500',
    typography: 'caption'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }
}
