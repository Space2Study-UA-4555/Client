export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    p: '20px',
    textDecoration: 'none'
  },
  iconBox: (color: string) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '48px',
    height: '48px',
    borderRadius: '6px',
    backgroundColor: color
  }),
  icon: {
    maxWidth: '28px',
    maxHeight: '28px'
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left'
    },
    title: {
      typography: 'subtitle2',
      color: 'primary.900'
    },
    description: {
      typography: 'caption',
      color: 'primary.500'
    }
  }
}
