const selectInput = {
  width: '100%',
  maxWidth: { sm: '160px', md: '220px' },
  mr: { sm: '20px', md: '30px' },
  mb: { xs: '20px', sm: '0' },
  '& .MuiOutlinedInput-root': {
    padding: '5px 9px'
  },
  label: {
    lineHeight: '20px'
  }
}

export const styles = {
  categoryInput: selectInput,
  subjectInput: selectInput,
  searchToolbar: {
    borderRadius: '70px'
  },
  mobileSelects: {
    display: 'flex',
    flexDirection: 'column'
  }
}
