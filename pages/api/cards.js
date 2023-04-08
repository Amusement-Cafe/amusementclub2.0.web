
import withData from '../../middlewares/withData';
import withMongo from '../../middlewares/withMongo';
import _ from "lodash"

const handler = async (req, res) => {
  const { collection, keywords } = req.query;
  const json = await req.headers.data
  const data = JSON.parse(json)

  //try {
    // const ids = data.ids.split(',').map(x => parseInt(x))

    const sortType = data.sort.split('-')
    const sort = {obtained: -1}
    sort[sortType[0]] = sortType[1] == 'desc'? -1 : 1

    const usercards = await req.db.collection('usercards')
      .find({userid: data.userId})
      .sort(sort)
      .limit(100)
      .toArray()

    let cards = usercards.map(x => req.cards[x.cardid]).filter(x => x)
    
    if (sortType[0] == 'name') {
      cards = cards.sort((a, b) => sort['name'] * a.name.localeCompare(b.name))
    }

    if (sortType[0] == 'stars') {
      cards = cards.sort((a, b) => sort['stars'] * (a.level - b.level))
    }

    if (collection) {
      console.log(collection)
      cards = cards.filter(x => x.col == collection)
    }

    console.log(cards.length)

    const cols = req.collections
    return res.status(200).json({ cards, cols })
    
  // } catch (error) {
  //   const cards = _.sampleSize(req.cards.filter(x => x.level < 4), 12)
  //   return res.status(200).json({ cards, cols: req.collections })
  // }
}

export default withMongo(withData(handler))
