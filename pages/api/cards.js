
import withData from '../../middlewares/withData';
import _ from "lodash"

const handler = async (req, res) => {
  const data = await req.headers.data

  try {
    const ids = JSON.parse(data).ids.split(',').map(x => parseInt(x))
    const cards = ids.map(x => req.cards[x])
    const cols = req.collections
    return res.status(200).json({ cards, cols })
    
  } catch (error) {
    const cards = _.sampleSize(req.cards.filter(x => x.level < 4), 32)
    return res.status(200).json({ cards, cols: req.collections })
  }
}

export default withData(handler)
