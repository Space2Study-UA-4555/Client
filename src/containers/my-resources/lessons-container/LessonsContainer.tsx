import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'

import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'
import AddResourceWithInput from '~/containers/my-resources/add-resource-with-input/AddResourceWithInput'
import MyResourcesTable from '~/containers/my-resources/my-resources-table/MyResourcesTable'
import Loader from '~/components/loader/Loader'
import useSort from '~/hooks/table/use-sort'
import useBreakpoints from '~/hooks/use-breakpoints'
import useAxios from '~/hooks/use-axios'
import { authRoutes } from '~/router/constants/authRoutes'
import usePagination from '~/hooks/table/use-pagination'

import { defaultResponses, snackbarVariants } from '~/constants'
import {
  columns,
  initialSort,
  itemsLoadLimit,
  removeColumnRules
} from '~/containers/my-resources/lessons-container/LessonsContainer.constants'
import {
  ItemsWithCount,
  GetResourcesParams,
  ErrorResponse,
  ResourcesTabsEnum,
  Lesson
} from '~/types'
import {
  ajustColumns,
  createUrlPath,
  getScreenBasedLimit
} from '~/utils/helper-functions'

const LessonsContainer = () => {
  const { setAlert } = useSnackBarContext()
  const sortOptions = useSort({ initialSort })
  const searchTitle = useRef<string>('')
  const breakpoints = useBreakpoints()
  const navigate = useNavigate()
  const { page, handleChangePage } = usePagination()
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const { sort } = sortOptions
  const itemsPerPage = getScreenBasedLimit(breakpoints, itemsLoadLimit)
  const columnsToShow = ajustColumns<Lesson>(
    breakpoints,
    columns,
    removeColumnRules
  )

  const onResponseError = useCallback(
    (error: ErrorResponse) => {
      setAlert({
        severity: snackbarVariants.error,
        message: error ? `errors.${error.code}` : ''
      })
    },
    [setAlert]
  )

  const getLessons = useCallback(
    () =>
      ResourceService.getLessons({
        limit: itemsPerPage,
        sort,
        title: searchTitle.current,
        skip: (page - 1) * itemsPerPage,
        categories: selectedItems
      }),
    [itemsPerPage, sort, page, selectedItems]
  )

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Lesson>,
    GetResourcesParams
  >({
    service: getLessons,
    defaultResponse: defaultResponses.itemsWithCount,
    onResponseError
  })

  const deleteLesson = useCallback(
    (id?: string) => ResourceService.deleteLesson(id ?? ''),
    []
  )

  const editLesson = (id: string) => {
    navigate(createUrlPath(authRoutes.myResources.editLesson.path, id))
  }

  const props = {
    columns: columnsToShow,
    data: { response, getData: fetchData },
    services: {
      deleteService: deleteLesson
    },
    itemsPerPage,
    actions: {
      onEdit: editLesson
    },
    resource: ResourcesTabsEnum.Lessons,
    sort: sortOptions,
    pagination: { page, onChange: handleChangePage }
  }

  return (
    <Box>
      <AddResourceWithInput
        btnText={'myResourcesPage.lessons.addBtn'}
        fetchData={fetchData}
        link={authRoutes.myResources.newLesson.path}
        searchRef={searchTitle}
        selectedItems={selectedItems}
        setItems={setSelectedItems}
      />
      {loading ? (
        <Loader pageLoad size={50} />
      ) : (
        <MyResourcesTable<Lesson> {...props} />
      )}
    </Box>
  )
}

export default LessonsContainer
