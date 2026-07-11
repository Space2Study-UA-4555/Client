import { emptyField, textField } from './common'

const nameLength = textField(2, 15)

const validateName = (value) => {
  const trimmedValue = value.trim()
  const helperText = /^[a-zа-яєії]+$/i.test(trimmedValue)
    ? nameLength(trimmedValue)
    : 'common.errorMessages.nameAlphabeticOnly'
  return emptyField(trimmedValue, 'common.errorMessages.emptyField', helperText)
}

export const firstName = validateName
export const lastName = validateName

export { email, password, confirmPassword } from './login'
