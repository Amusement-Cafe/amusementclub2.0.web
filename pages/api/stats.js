
import withMongo from '../../middlewares/withMongo';
import withData from '../../middlewares/withData';

const handler = async (req, res) => {
    const userId = req.query.userId
    const include = req.query.include?.split(',')
    const range = req.query.range

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" })
    }

    if (!include) {
      return res.status(400).json({ error: "Includes are empty" })
    }

    try {
    const result = {}

    if (include.includes('latest')) {
      result.latest = await req.db.collection('userstats')
        .findOne({ discord_id: userId })
    }

    if (include.includes('combined') && range) {
      const date = new Date()
      date.setDate(date.getDate() - range)

      const selected = await req.db.collection('userstats')
        .find({
          discord_id: userId,
          //daily: { $gte: date }
        }, { projection: { _id:0, username: 0, discord_id: 0, daily: 0 }})
        .toArray()
      
      if (selected.length > 0) {
        result.combined = selected.reduce((acc, cur) => {
          Object.keys(cur).forEach(key => {
            if (!acc[key]) {
              acc[key] = cur[key]
            } else {
              acc[key] += cur[key]
            }
          })

          return acc
        })
      }
    }

    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

export default withMongo(withData(handler))
