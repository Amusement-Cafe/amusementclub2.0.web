import { getServerSession } from "next-auth/next"
import { getToken } from "next-auth/jwt"
import { authOptions } from '../pages/api/auth/[...nextauth]'

const withSession = handler => async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  const token = await getToken({ req })
  req.session = {
    ...session,
    user: {
      ...session.user,
      id: token.sub
    }
  }
  return handler(req, res)
}

export default withSession
