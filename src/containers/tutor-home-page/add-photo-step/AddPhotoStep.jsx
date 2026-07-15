import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'
import FileUploader from '~/components/file-uploader/FileUploader'
import { useStepContext } from '~/context/step-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useAppSelector } from '~/hooks/use-redux'
import { userService } from '~/services/user-service'
import { snackbarVariants } from '~/constants'
import { ButtonVariantEnum } from '~/types'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'
import { styles } from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep.styles'
import StepLayout from '~/containers/tutor-home-page/step-layout/StepLayout'
import { createDisplayFile, createPhotoPayload } from '~/utils/photo-file'

const getSavedPhoto = (stepData, stepLabel) => {
  const data = stepLabel ? stepData?.[stepLabel] : null
  return Array.isArray(data) && data.length ? data[0] : null
}

const AddPhotoStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { handleStepData, stepData } = useStepContext()
  const { setAlert } = useSnackBarContext()
  const { userId } = useAppSelector((state) => state.appMain)

  const savedPhoto = getSavedPhoto(stepData, stepLabel)

  const [files, setFiles] = useState(() =>
    savedPhoto?.name ? [createDisplayFile(savedPhoto.name, 'image/jpeg')] : []
  )
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState(savedPhoto?.src ?? '')

  const resetPhoto = useCallback(() => {
    setFiles([])
    setPreviewUrl('')
    handleStepData(stepLabel, [])
  }, [handleStepData, stepLabel])

  const uploadPhoto = useCallback(
    async (file) => {
      const payload = await createPhotoPayload(file)

      try {
        await userService.updateUser(userId, { photo: payload.src })
        setPreviewUrl(payload.src)
        setFiles([file])
        handleStepData(stepLabel, [payload])
      } catch (uploadError) {
        resetPhoto()
        setAlert({
          severity: snackbarVariants.error,
          message: uploadError?.response?.data?.code
            ? `errors.${uploadError.response.data.code}`
            : ''
        })
      }
    },
    [handleStepData, resetPhoto, setAlert, stepLabel, userId]
  )

  const handleFilesChange = useCallback(
    async ({ files: nextFiles, error: validationError }) => {
      setError(validationError ?? '')

      if (validationError) {
        return
      }

      if (!nextFiles.length) {
        resetPhoto()
        return
      }

      await uploadPhoto(nextFiles[0])
    },
    [resetPhoto, uploadPhoto]
  )

  useEffect(() => {
    const photo = getSavedPhoto(stepData, stepLabel)

    if (!photo) {
      setFiles([])
      setPreviewUrl('')
      return
    }

    setPreviewUrl(photo.src ?? '')
    setFiles(photo.name ? [createDisplayFile(photo.name, 'image/jpeg')] : [])
  }, [stepData, stepLabel])

  const renderPreviewContent = () =>
    previewUrl ? (
      <Box
        alt={t('becomeTutor.photo.imageAlt')}
        component='img'
        src={previewUrl}
        sx={styles.previewImg}
      />
    ) : (
      <Typography sx={styles.placeholder}>
        {t('becomeTutor.photo.placeholder')}
      </Typography>
    )

  const renderPreviewZone = () => (
    <DragAndDrop
      emitter={handleFilesChange}
      initialState={files}
      style={styles.dragAndDrop}
      validationData={validationData}
    >
      {renderPreviewContent()}
    </DragAndDrop>
  )

  return (
    <StepLayout
      btnsBox={btnsBox}
      leftContent={renderPreviewZone()}
      title={t('becomeTutor.photo.description')}
    >
      <FileUploader
        buttonText={t('becomeTutor.photo.button')}
        emitter={handleFilesChange}
        initialError={error}
        initialState={files}
        isImages
        sx={styles.fileUploader}
        validationData={validationData}
        variant={ButtonVariantEnum.Outlined}
      />
      <Box sx={styles.mobilePreview}>{renderPreviewZone()}</Box>
    </StepLayout>
  )
}

export default AddPhotoStep
