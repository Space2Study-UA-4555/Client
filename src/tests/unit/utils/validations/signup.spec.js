import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword
} from '~/utils/validations/signup'

describe('signup validations', () => {
  describe('firstName / lastName', () => {
    it('should return empty field error for empty value', () => {
      expect(firstName('')).toBe('common.errorMessages.emptyField')
      expect(lastName('')).toBe('common.errorMessages.emptyField')
    })

    it('should return alphabetic-only error for non-alphabetic value', () => {
      expect(firstName('John1')).toBe('common.errorMessages.nameAlphabeticOnly')
    })

    it('should return short text error for value shorter than 2 symbols', () => {
      expect(firstName('a')).toBe('common.errorMessages.shortText')
    })

    it('should return long text error for value longer than 15 symbols', () => {
      expect(firstName('abcdefghijklmnop')).toBe(
        'common.errorMessages.longText'
      )
    })

    it('should pass for a valid name within 2-15 symbols', () => {
      expect(firstName('John')).toBeFalsy()
      expect(lastName('Doe')).toBeFalsy()
    })
  })

  describe('email', () => {
    it('should return error for invalid email', () => {
      expect(email('invalid')).toBe('common.errorMessages.emailValid')
    })

    it('should pass for valid email', () => {
      expect(email('john@mail.com')).toBeFalsy()
    })
  })

  describe('password', () => {
    it('should return error when there is no digit or letter', () => {
      expect(password('password')).toBe('common.errorMessages.passwordValid')
      expect(password('12345678')).toBe('common.errorMessages.passwordValid')
    })

    it('should pass for password with a letter and a digit', () => {
      expect(password('passTest1')).toBeFalsy()
    })
  })

  describe('confirmPassword', () => {
    it('should return error when passwords do not match', () => {
      expect(confirmPassword('passTest1', { password: 'passTest2' })).toBe(
        'common.errorMessages.passwordsDontMatch'
      )
    })

    it('should pass when passwords match', () => {
      expect(
        confirmPassword('passTest1', { password: 'passTest1' })
      ).toBeFalsy()
    })
  })
})
