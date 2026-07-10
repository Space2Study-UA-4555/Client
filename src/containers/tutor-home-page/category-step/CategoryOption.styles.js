export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: 'primary.0',
    transition: 'background-color 0.2s ease',

    '&:hover': {
      backgroundColor: 'primary.50'
    }
  },

  title: {
    typography: 'body1',
    color: 'primary.900',
    marginBottom: '4px'
  },

  subtitle: {
    typography: 'body2',
    color: 'primary.600'
  }
}
