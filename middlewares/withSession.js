import { getServerSession } from "next-auth/next"
import { getToken } from "next-auth/jwt"
import { authOptions } from '../pages/api/auth/[...nextauth]'

const withSession = handler => async (req, res) => {
  try {
    const session = await getServerSession(req, res, authOptions)
    const token = await getToken({ req })
    req.session = {
      ...session,
      user: {
        ...session.user,
        id: token.sub
      }
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
  
  return handler(req, res)
}

export default withSession
