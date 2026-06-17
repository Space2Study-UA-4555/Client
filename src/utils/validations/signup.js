import { emptyField, textField } from './common'
import { email, password, confirmPassword } from './login'

const nameLength = textField(2, 15)

const nameField = (value) => {
  if (!RegExp(/^[a-zа-яєії ]+$/i).test(value)) {
    return 'common.errorMessages.nameAlphabeticOnly'
  }
  return nameLength(value)
}

export const firstName = (value) => {
  return emptyField(value, 'common.errorMessages.emptyField', nameField(value))
}

export const lastName = (value) => {
  return emptyField(value, 'common.errorMessages.emptyField', nameField(value))
}

export { email, password, confirmPassword }
