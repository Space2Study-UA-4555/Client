export const styles = {
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
  textArea: {
    width: '100%'
  },
  textAreaInput: {
    width: '100%'
  }
}
