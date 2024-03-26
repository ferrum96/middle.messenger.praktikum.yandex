export enum ValidatePattern {
  NamePattern = '^[А-ЯA-Z][а-яa-z-]*$',
  LoginPattern = '^(?![0-9]+$)[a-zA-Z0-9_-]{3,20}$',
  EmailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-zA-Z]+$',
  PasswordPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-zA-Z]+$',
  PhonePattern = '^\\+?\\d{10,15}$'
}
