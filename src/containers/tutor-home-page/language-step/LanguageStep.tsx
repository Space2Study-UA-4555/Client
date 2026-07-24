import { FC, ReactNode, SyntheticEvent } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import { languageService } from '~/services/language-service'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import langImg from '~/assets/img/tutor-home-page/become-tutor/languages.svg'

interface Language {
  _id: string
  name: string
}

interface LanguageStepProps {
  btnsBox: ReactNode
  stepLabel: string
}

const LanguageStep: FC<LanguageStepProps> = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { stepData, handleStepData } = useStepContext()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const language = stepData[stepLabel] as Language | null

  const handleLanguageChange = (
    _: SyntheticEvent,
    newValue: Language | null
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    handleStepData(stepLabel, newValue)
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    <Box sx={styles.container}>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Box sx={styles.imgWrapper}>
        <Box
          alt='language step illustration'
          component='img'
          src={langImg}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          sx={styles.img}
        />
      </Box>

      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Box sx={styles.rightContent}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Typography sx={styles.description}>
          {t('becomeTutor.languages.title')}
        </Typography>

        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
        <Box sx={styles.imgMobile}>
          <Box alt='language step illustration' component='img' src={langImg} />
        </Box>

        <AsyncAutocomplete
          ListboxProps={{ style: { maxHeight: 250 } }}
          fetchOnFocus
          labelField='name'
          onChange={handleLanguageChange}
          service={languageService.getLanguages}
          textFieldProps={{
            label: t('becomeTutor.languages.autocompleteLabel')
          }}
          value={language?._id ?? null}
          valueField='_id'
        />

        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
