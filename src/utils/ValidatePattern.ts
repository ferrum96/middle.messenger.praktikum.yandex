export enum ValidatePattern {
  NamePattern = '^[А-ЯA-Z][а-яa-z-]*$',
  LoginPattern = '^(?!\\d+$)[a-zA-Z0-9_-]{3,20}$',
  EmailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\\.[a-zA-Z]+$',
  PasswordPattern = '^(?=.*[A-Z])(?=.*\\d).{8,40}$',
  PhonePattern = '^\\+?\\d{10,15}$'
}
