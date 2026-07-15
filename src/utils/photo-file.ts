export interface PhotoFilePayload {
  name: string
  src: string
}

export const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

export const createPhotoPayload = async (
  file: File
): Promise<PhotoFilePayload> => ({
  name: file.name,
  src: await readFileAsDataUrl(file)
})

export const createDisplayFile = (name: string, type: string) =>
  new File([''], name, { type })

export const getPhotoForApi = (photo?: PhotoFilePayload | string) => {
  if (!photo) {
    return ''
  }

  if (typeof photo === 'string') {
    return photo
  }

  return photo.src ?? ''
}
