
import withData from '../../middlewares/withData';
import withMongo from '../../middlewares/withMongo';
import _ from "lodash"

const handler = async (req, res) => {
  const { userId } = req.query

  if (!userId || userId === 'undefined') {
    const users = await req.db.collection('webusers')
      .find({})
      .limit(100)
      .toArray()
    
    return res.status(200).json(users)
  }

  const user = await req.db.collection('users').findOne({ discord_id: userId })

  return res.status(200).json(user)
}

export default withMongo(handler)