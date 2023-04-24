
import withMongo from '../../middlewares/withMongo';
import withData from '../../middlewares/withData';
import withSession from '../../middlewares/withSession';

const handler = async (req, res) => {
  const session = req.session
  
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  let id = req.query.userId
  if (!id || id === 'undefined') {
    id = session.user.id
  }

  //try {
    
    const user = await req.db.collection('users').findOne({discord_id: id})
    const hero = await req.db.collection('heros').findOne({id: user.hero})
    const favCardIds = await req.db.collection('usercards')
      .find({userid: id}, { _id:0, userid:0 })
      .sort({rating: -1})
      .limit(5)
      .toArray()

    const favCards = favCardIds.map(x => req.cards[x.cardid])
    const clout = user.cloutedcols
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6)
      .map(x => ({
        ...x,
        ...req.collections.find(y => y.id == x.id)
      }))

    const webUser = await req.db.collection('webusers').findOne({discord_id: id})
    
    if (session.user.id === id) {
      if (!webUser) {
        await req.db.collection('webusers').insertOne({
          discord_id: id,
          username: session.user.name,
          avatar: session.user.image,
        })
      }
      else if (webUser.username != session.user.name || webUser.avatar != session.user.image) {
        await req.db.collection('webusers').updateOne({discord_id: id}, {
          $set: {
            username: session.user.name,
            avatar: session.user.image,
          }
        })
      }
    }

    if (webUser) {
      user.avatar = webUser.avatar
    }
    
    return res.status(200).json({ user, hero, favCards, clout })
    
  // } catch (error) {

  // }
}

export default withSession(withMongo(withData(handler)))
