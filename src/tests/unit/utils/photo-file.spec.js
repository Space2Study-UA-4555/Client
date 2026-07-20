import {
  createDisplayFile,
  createPhotoPayload,
  getPhotoForApi,
  readFileAsDataUrl
} from '~/utils/photo-file'

describe('photo-file utils', () => {
  it('should read file as data url', async () => {
    const file = new File(['photo'], 'photo.png', { type: 'image/png' })
    const result = await readFileAsDataUrl(file)

    expect(result).toContain('data:image/png;base64')
  })

  it('should create photo payload', async () => {
    const file = new File(['photo'], 'photo.png', { type: 'image/png' })
    const result = await createPhotoPayload(file)

    expect(result.name).toBe('photo.png')
    expect(result.src).toContain('data:image/png;base64')
  })

  it('should create display file for restored state', () => {
    const file = createDisplayFile('avatar.jpg', 'image/jpeg')

    expect(file.name).toBe('avatar.jpg')
    expect(file.type).toBe('image/jpeg')
  })

  it('should return photo src for api payload', () => {
    expect(
      getPhotoForApi({ name: 'avatar.jpg', src: 'data:image/jpeg;base64,abc' })
    ).toBe('data:image/jpeg;base64,abc')
    expect(getPhotoForApi('avatar.jpg')).toBe('avatar.jpg')
    expect(getPhotoForApi()).toBe('')
  })
})
