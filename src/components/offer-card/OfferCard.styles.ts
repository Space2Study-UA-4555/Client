export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: { sm: 'auto 1fr auto', xs: '1fr' },
    gap: '24px',
    p: '30px',
    textDecoration: 'none'
  },
  userInfo: {
    root: {
      alignItems: 'center',
      textAlign: 'center',
      minWidth: '110px'
    },
    info: {
      alignItems: 'center'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: 0
  },
  title: {
    color: 'primary.900'
  },
  chips: {
    display: 'flex',
    gap: '8px'
  },
  description: {
    color: 'primary.600',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  side: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px',
    minWidth: { sm: '180px' }
  },
  priceBlock: {
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
  bookmarkButton: {
    color: 'primary.900',
    p: '4px'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }
}
