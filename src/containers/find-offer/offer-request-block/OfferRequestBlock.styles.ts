const drawerTopOffset = {
  xs: '56px',
  sm: '72px',
  md: '80px'
}

export const styles = {
  button: {
    py: '14px'
  },
  drawerModal: {
    top: drawerTopOffset
  },
  drawerBackdrop: {
    top: drawerTopOffset
  },
  drawerPaper: {
    top: drawerTopOffset,
    width: { xs: '100%', sm: '60%', md: '50%', lg: '45%' },
    maxWidth: { xs: '720px' },
    p: '24px 36px',
    boxSizing: 'border-box',
    boxShadow: 'none'
  }
}
