import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import { languageService } from '~/services/language-service'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'

const LanguageStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { handleStepData } = useStepContext()
  const [language, setLanguage] = useState(null)

  const handleLanguageChange = (_, newValue) => {
    setLanguage(newValue)
    handleStepData(stepLabel, newValue)
  }

  const img = (
    <Box
      alt='language step illustration'
      component='img'
      src='/src/assets/img/tutor-home-page/become-tutor/languages.svg'
      sx={styles.img}
    />
  )

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgWrapper}>{img}</Box>
      <Box sx={styles.rightContent}>
        <Typography sx={styles.description}>
          {t('becomeTutor.languages.title')}
        </Typography>
        <Box sx={styles.imgMobile}>{img}</Box>

        <AsyncAutocomplete
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
