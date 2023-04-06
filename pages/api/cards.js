
import withData from '../../middlewares/withData';
import withMongo from '../../middlewares/withMongo';
import _ from "lodash"

const handler = async (req, res) => {
  const json = await req.headers.data
  const data = JSON.parse(json)

  //try {
    // const ids = data.ids.split(',').map(x => parseInt(x))
    const usercards = await req.db.collection('usercards').find({userid: data.userId})
      .sort({obtained:1})
      .limit(10)
      .toArray()

    const cards = usercards.map(x => req.cards[x.cardid])
    const cols = req.collections
    return res.status(200).json({ cards, cols })
    
  // } catch (error) {
  //   const cards = _.sampleSize(req.cards.filter(x => x.level < 4), 12)
  //   return res.status(200).json({ cards, cols: req.collections })
  // }
}

export default withMongo(withData(handler))
