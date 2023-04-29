
import withSession from '../../middlewares/withSession';
import withMongo from '../../middlewares/withMongo';
import withData from '../../middlewares/withData';

const handler = async (req, res) => {
    const userId = req.session.user.id
    console.log(userId)

  try {
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const userQuests = await req.db.collection('userquests')
      .find({
        userid: userId,
        completed: false,
      })
      .sort({id: -1})
      .toArray()

    const completedCount = await req.db.collection('userquests')
      .countDocuments({
        userid: userId,
        completed: true,
        // TODO limit to last 30 days
      })

    userQuests.map(x => {
      x.data = req.quests[x.type].find(y => y.questid == x.id)
    })

    return res.status(200).json({
      userQuests,
      completedCount,
    })
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

export default withSession(withMongo(withData(handler)))
