import { useState } from 'react'
import { filesValidation } from '~/utils/validations/files'

const mergeFiles = (existing, incoming, maxQuantityFiles) => {
  const incomingFiles = [...incoming]

  if (maxQuantityFiles === 1) {
    return incomingFiles.slice(0, 1)
  }

  return [...existing, ...incomingFiles].slice(0, maxQuantityFiles)
}

const useUpload = ({ files, validationData, emitter }) => {
  const [isDrag, setIsDrag] = useState(false)

  const dragStart = (e) => {
    e.preventDefault()
    setIsDrag(true)
  }
  const dragLeave = (e) => {
    e.preventDefault()
    setIsDrag(false)
  }
  const dragDrop = (e) => {
    e.preventDefault()
    const newFiles = mergeFiles(
      files,
      e.dataTransfer.files,
      validationData.maxQuantityFiles
    )
    const error = filesValidation(newFiles, validationData)
    setIsDrag(false)
    const filesForEmitter = error ? files : newFiles
    emitter({ files: filesForEmitter, error })
  }

  const addFiles = (e) => {
    e.preventDefault()
    const newFiles = mergeFiles(
      files,
      e.target.files,
      validationData.maxQuantityFiles
    )
    const error = filesValidation(newFiles, validationData)
    const filesForEmitter = error ? files : newFiles
    emitter({ files: filesForEmitter, error })
  }

  const deleteFile = (file) => {
    const newFiles = files.filter((item) => item !== file)
    emitter({
      files: newFiles,
      error: filesValidation(newFiles, validationData)
    })
  }

  return {
    dragStart,
    dragLeave,
    dragDrop,
    addFiles,
    deleteFile,
    isDrag
  }
}

export default useUpload
