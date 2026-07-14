export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: { xs: '40px', md: '80px' },
    px: { xs: '16px', md: '0' }
  },
  title: {
    typography: { xs: 'h5', md: 'h4' },
    fontWeight: 600,
    mb: '16px',
    textAlign: 'center'
  },
  description: {
    typography: 'body1',
    color: 'text.secondary',
    mb: { xs: '32px', md: '48px' },
    textAlign: 'center'
  },
  cardsContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '24px',
    mb: { xs: '32px', md: '48px' }
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '230px'
  },
  cardImage: {
    width: '88px',
    height: '88px',
    mb: '16px'
  },
  cardTitle: {
    typography: 'h6',
    fontWeight: 600,
    mb: '8px'
  },
  cardDescription: {
    typography: 'body2',
    color: 'text.secondary'
  },
  button: {
    px: '48px'
  }
}
