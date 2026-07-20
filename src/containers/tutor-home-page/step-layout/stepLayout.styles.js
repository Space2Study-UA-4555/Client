import { fadeAnimation } from '~/styles/app-theme/custom-animations'
import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

const layout = {
  stepHeight: '485px',
  columnMaxWidth: '432px',
  columnGap: '40px',
  sectionGap: '16px',
  sectionGapSm: '14px',
  headerBodyGapSm: '12px',
  footerGap: '8px',
  footerGapSm: '6px',
  scrollSafeInset: '12px',
  scrollGutter: '12px',
  rightBoxPtSm: '16px'
}

export const stepLayoutStyles = {
  container: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    gap: layout.columnGap,
    flex: 1,
    minHeight: 0,
    height: { sm: layout.stepHeight },
    maxHeight: { sm: layout.stepHeight },
    width: '100%',
    ...fadeAnimation
  },
  imgContainer: {
    display: { xs: 'none', sm: 'flex' },
    flex: 1,
    maxWidth: layout.columnMaxWidth,
    pb: { sm: '52px' }
  },
  img: {
    width: '100%'
  },
  mobileImgContainer: {
    display: { xs: 'flex', sm: 'none' },
    justifyContent: 'center'
  },
  mobileImg: {
    width: '100%',
    maxWidth: '220px',
    maxHeight: '220px',
    objectFit: 'contain'
  },
  rightBox: {
    maxWidth: layout.columnMaxWidth,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    overflow: 'hidden',
    alignSelf: 'stretch',
    m: { xs: '0 auto', md: 0 },
    pt: { sm: layout.rightBoxPtSm }
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: layout.sectionGap,
    flexShrink: 0
  },
  title: {
    typography: 'body1',
    color: 'primary.700'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: layout.sectionGap, sm: layout.sectionGapSm },
    flex: 1,
    minHeight: 0,
    mt: { xs: layout.sectionGap, sm: layout.headerBodyGapSm },
    overflowY: 'auto',
    pt: layout.scrollSafeInset,
    pr: layout.scrollGutter,
    pb: layout.scrollSafeInset,
    ...scrollbar
  },
  footer: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: layout.footerGap, sm: layout.footerGapSm },
    flexShrink: 0,
    pt: { xs: layout.footerGap, sm: layout.footerGapSm }
  },
  formHint: {
    typography: 'body2',
    color: 'primary.700'
  },
  btnsBox: {
    mt: { sm: '10px' },
    pb: { xs: '24px', sm: 0 }
  }
}
