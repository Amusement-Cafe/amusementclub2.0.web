
import { getSession } from "next-auth/react"

import withData from '../../middlewares/withData';
import withMongo from '../../middlewares/withMongo';
import withSession from '../../middlewares/withSession';
import _ from "lodash"

const handler = async (req, res) => {
  const session = req.session

  if (!session) return res.status(401).json({ error: "Unauthorized" })

  const userId = session.user.id
  let plots = await req.db.collection('plots')
        .find({
          user_id: userId,
        }, { projection: { 
            _id:0, guild_name:1, building:1,
        }})
        .toArray()
  
  plots.filter(plot => plot.building?.id).map(plot => { 
    const item = req.items.find(item => item.id === plot.building.id)
    plot.building = {...plot.building, ...item}
  })

  return res.status(200).json(plots)
}

export default withSession(withMongo(withData(handler)))
