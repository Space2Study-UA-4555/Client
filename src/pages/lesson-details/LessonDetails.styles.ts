import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    p: { sm: '40px 36px', md: '40px 72px' }
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  editIcon: {
    ml: '8px',
    width: { xs: '18px', sm: '20px' }
  },
  title: {
    typography: TypographyVariantEnum.H4,
    color: 'primary.900'
  },
  description: {
    typography: TypographyVariantEnum.Body1,
    color: 'primary.700'
  },
  accordion: {
    boxShadow: 'none',
    border: 'none',
    '&:before': { display: 'none' }
  },
  accordionTitle: {
    typography: TypographyVariantEnum.Subtitle1,
    color: 'primary.900'
  },
  content: {
    color: 'primary.700',
    '& img': { maxWidth: '100%' }
  }
}
