export const styles = {
  container: {
    display: 'flex',
    gap: '10px'
  },
  button: (isActive: boolean) => ({
    color: isActive ? 'primary.900' : 'primary.300',
    border: '1px solid',
    borderColor: isActive ? 'primary.900' : 'primary.100',
    borderRadius: '4px',
    p: '4px'
  })
}
