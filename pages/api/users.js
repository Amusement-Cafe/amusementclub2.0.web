
import withData from '../../middlewares/withData';
import withMongo from '../../middlewares/withMongo';
import _ from "lodash"

const escapeRegex = (string) => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

const handler = async (req, res) => {
  const { id } = req.query;

  //try {
    const user = await req.db.collection('users').findOne({discord_id: id})
    const hero = await req.db.collection('heros').findOne({id: user.hero})
    const favCardIds = await req.db.collection('usercards')
      .find({userid: id}, { _id:0, userid:0 })
      .sort({rating: -1})
      .limit(6)
      .toArray()

    const favCards = favCardIds.map(x => req.cards[x.cardid])
    const clout = user.cloutedcols
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6)
      .map(x => ({
        ...x,
        ...req.collections.find(y => y.id == x.id)
      }))

    console.log(clout)
    
    return res.status(200).json({ user, hero, favCards, clout })
    
  // } catch (error) {

  // }
}

export default withData(withMongo(handler))