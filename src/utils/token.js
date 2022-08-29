import jwt from 'jsonwebtoken'

export const tokenGenerator = (paylod) => {
  const token = jwt.sign(paylod, process.env.SECRET_KEY, {
    expiresIn: '365 days',
  })
  return token
}

export const verifyJwtToken = (token) => {
  const result = jwt.verify(token, process.env.SECRET_KEY)

  if (!result?.username) {
    throw { status: 401, message: 'Please log in to your account' }
  }
  return result
}
