
import withData from '../../middlewares/withData';
import withMongo from '../../middlewares/withMongo';
import _ from "lodash"

const escapeRegex = (string) => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

const handler = async (req, res) => {
  const { id } = req.query;

  //try {
    const user = await req.db.collection('users').findOne({discord_id: id})
    const hero = await req.db.collection('heros').findOne({id: user.hero})
    
    return res.status(200).json({ user, hero })
    
  // } catch (error) {

  // }
}

export default withMongo(handler)