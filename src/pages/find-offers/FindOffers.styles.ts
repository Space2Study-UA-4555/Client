export const styles = {
  titleWithDescription: {
    wrapper: {
      my: '30px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  },
  navigation: {
    display: 'flex',
    justifyContent: 'flex-start',
    mb: '20px'
  },
  listToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    my: '30px'
  },
  listToolbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  }
}
