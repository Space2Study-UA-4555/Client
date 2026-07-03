export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    my: '40px'
  },
  title: {
    color: 'primary.900'
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    py: '40px'
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: {
      md: 'repeat(3, 1fr)',
      sm: 'repeat(2, 1fr)',
      xs: '1fr'
    },
    gap: '24px'
  },
  viewAllBtn: {
    alignSelf: 'center'
  }
}
