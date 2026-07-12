import { FC, SyntheticEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'

import AppToolbar from '~/components/app-toolbar/AppToolbar'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'
import useBreakpoints from '~/hooks/use-breakpoints'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'

import { styles } from '~/containers/find-offer/offer-search-toolbar/OfferSearchToolbar.styles'
import { CategoryNameInterface, SubjectNameInterface } from '~/types'

interface OfferSearchToolbarProps {
  searchParams: URLSearchParams
  setSearchParams: (params: URLSearchParams) => void
}

const OfferSearchToolbar: FC<OfferSearchToolbarProps> = ({
  searchParams,
  setSearchParams
}) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()

  const categoryId = searchParams.get('categoryId') ?? ''
  const subjectId = searchParams.get('subjectId') ?? ''

  const getSubjectsNames = useCallback(
    () => subjectService.getSubjectsNames(categoryId || null),
    [categoryId]
  )

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    searchParams.set('categoryId', value?._id ?? '')
    searchParams.delete('subjectId')
    setSearchParams(searchParams)
  }

  const onSubjectChange = (
    _: SyntheticEvent,
    value: SubjectNameInterface | null
  ) => {
    searchParams.set('subjectId', value?._id ?? '')
    setSearchParams(searchParams)
  }

  const updateSearch = (search: string) => {
    searchParams.set('search', search)
    setSearchParams(searchParams)
  }

  const autoCompletes = (
    <>
      <AsyncAutocomplete
        labelField='name'
        onChange={onCategoryChange}
        service={categoryService.getCategoriesNames}
        sx={styles.categoryInput}
        textFieldProps={{ label: t('breadCrumbs.category') }}
        value={categoryId}
        valueField='_id'
      />
      <AsyncAutocomplete
        fetchCondition={Boolean(categoryId)}
        labelField='name'
        onChange={onSubjectChange}
        service={getSubjectsNames}
        sx={styles.subjectInput}
        textFieldProps={{ label: t('breadCrumbs.subject') }}
        value={subjectId}
        valueField='_id'
      />
    </>
  )

  return (
    <>
      <AppToolbar sx={styles.searchToolbar}>
        {!isMobile && autoCompletes}
        <SearchFilterInput
          textFieldProps={{
            placeholder: t('findOffers.searchToolbar.label')
          }}
          updateFilter={updateSearch}
        />
      </AppToolbar>
      {isMobile && <Box sx={styles.mobileSelects}>{autoCompletes}</Box>}
    </>
  )
}

export default OfferSearchToolbar
