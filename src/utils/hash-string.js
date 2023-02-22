import bcrypt from 'bcrypt'

export const hashString = (string) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(string, salt)
}
