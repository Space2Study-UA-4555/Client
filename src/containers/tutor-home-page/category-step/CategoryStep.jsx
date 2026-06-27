import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useStepContext } from '~/context/step-context'
import { categoryService } from '~/services/category-service'
import img from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'

import { styles } from './CategoryStep.styles'
import CategoryOption from './CategoryOption'

const CategoryStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { handleStepData, stepData } = useStepContext()

  const [category, setCategory] = useState(null)

  useEffect(() => {
    const saved = stepData?.[stepLabel]
    setCategory(saved?.category ?? null)
  }, [stepData, stepLabel])

  const handleCategoryChange = (_, value) => {
    const categoryId = value?._id ?? null
    setCategory(categoryId)

    handleStepData(stepLabel, {
      category: categoryId
    })
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='' component='img' src={img} sx={styles.img} />
      </Box>

      <Box sx={styles.rightBox}>
        <Box sx={styles.form}>
          <Typography sx={styles.title}>
            {t('becomeTutor.categories.title')}
          </Typography>

          <AsyncAutocomplete
            fetchOnFocus
            labelField='name'
            onChange={handleCategoryChange}
            renderOption={(props, option) => (
              <li {...props}>
                <CategoryOption option={option} />
              </li>
            )}
            service={categoryService.getCategoriesNames}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={category}
            valueField='_id'
          />
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default CategoryStep
