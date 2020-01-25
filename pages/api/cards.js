
import withMongo from '../../middlewares/withMongo';
import withData from '../../middlewares/withData';

const handler = async (req, res) => {
  const data = await req.headers.data

  try {
    const ids = JSON.parse(data).ids.split(',').map(x => parseInt(x))
    const cards = ids.map(x => req.cards[x])
    return res.status(200).json({ cards })
    
  } catch (error) {
    return res.status(200).json({ cards: req.cards })
  }
}

export default withMongo(withData(handler))
