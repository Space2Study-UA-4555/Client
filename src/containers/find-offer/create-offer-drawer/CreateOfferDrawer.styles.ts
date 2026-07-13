export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    mb: '100px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  titleIcon: {
    color: 'primary.700',
    fontSize: '20px'
  },
  title: {
    typography: 'h5',
    color: 'primary.800'
  },
  description: {
    typography: 'body1',
    color: 'primary.600',
    maxWidth: '620px'
  },
  sectionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    pl: { sm: '34px' }
  },
  inputAutocomplete: {
    m: '4px 0 16px'
  },
  fieldDescription: {
    color: 'primary.600',
    typography: 'body1',
    m: '4px 0'
  },
  textFieldWithCounter: {
    position: 'relative'
  },
  counter: {
    color: 'primary.400',
    typography: 'body2',
    position: 'absolute',
    right: 0,
    bottom: '-2px'
  },
  textareaWrapper: {
    '& > .MuiTypography-root:last-child': {
      color: 'primary.400'
    }
  },
  chipList: {
    mt: '8px'
  },
  priceInput: {
    maxWidth: '240px',
    '& .MuiInputBase-input': {
      color: 'primary.600',
      pl: '8px'
    },
    '& .MuiInputAdornment-root': {
      mr: 0
    }
  },
  currencyIcon: {
    width: '14px'
  },
  priceRangeBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  priceRangeSlider: {
    color: 'primary.700',
    maxWidth: '260px'
  },
  priceRangeInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  priceRangeLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '260px'
  },
  priceRangeLabel: {
    color: 'primary.700',
    typography: 'caption'
  },
  selectedPrice: {
    color: 'primary.600',
    typography: 'caption',
    ml: '90px',
    mt: '-16px'
  },
  rangeSeparator: {
    color: 'primary.600',
    fontSize: '20px',
    flexShrink: 0
  },
  rangeInput: {
    maxWidth: '120px',
    '& .MuiInputBase-input': {
      color: 'primary.600'
    },
    '& .MuiInputAdornment-root': {
      ml: '6px'
    }
  },
  fitText: {
    color: 'primary.400',
    typography: 'body1'
  },
  faqItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  faqFieldsWithDelete: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px'
  },
  faqFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  faqTextareaWrapper: {
    '& > .MuiTypography-root:last-child': {
      color: 'primary.400',
      left: 0,
      right: 'auto'
    }
  },
  faqQuestionRow: {
    display: 'flex',
    alignSelf: 'flex-start',
    gap: '8px'
  },
  deleteFAQButton: {
    color: 'primary.700',
    mt: '3px',
    p: '8px'
  },
  addQuestionButton: {
    alignSelf: 'flex-start'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    mt: '20px'
  },
  primaryAction: {
    minWidth: { xs: '160px', sm: '166px' }
  },
  secondaryAction: {
    minWidth: { xs: '160px', sm: '172px' }
  },
  errorTooltip: {
    p: 0,
    m: 0
  },
  errorLanguages: {
    color: 'error.500',
    m: '0 14px 8px',
    minHeight: '20px',
    display: 'block'
  }
}
