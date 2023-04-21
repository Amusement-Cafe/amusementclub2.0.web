
import withData from '../../middlewares/withData';
import withMongo from '../../middlewares/withMongo';
import _ from "lodash"

const escapeRegex = (string) => string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

const handler = async (req, res) => {
  const pageAmount = 50 // 50 cards per page
  const { collection, keywords } = req.query;
  const json = await req.headers.data
  const data = JSON.parse(json)

  //try {
    let cards = []
    const sortType = data.sort.split('-')
    const sort = {obtained: -1}

    if (!data.userId) {

      // TODO implement sorting
      cards = _.reverse(req.cards)

    } else if (data.useWishlist) {
      const user = await req.db.collection('users')
        .findOne({discord_id: data.userId}, { projection: { _id:0, wishlist:1 }})
      
      // TODO implement sorting
      cards = user.wishlist.map(x => (req.cards[x]))
    }
    else {
      sort[sortType[0]] = sortType[1] == 'desc'? -1 : 1
      
      const usercards = await req.db.collection('usercards')
        .find({userid: data.userId}, { projection: { _id:0, userid:0 }})
        .sort(sort)
        .toArray()
      
      cards = usercards
        .map(x => ({...x, ...req.cards[x.cardid]}))
        .filter(x => x.col)
    }

    if (keywords && keywords.length >= 3) {
      cards = cards.filter(c => (new RegExp(`(_|^)${keywords.split(' ').map(k => escapeRegex(k)).join('.*')}`, 'gi')).test(c.name))
    }
    
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

    cards = cards.slice(pageAmount * (data.page - 1), pageAmount * data.page)

    const cols = req.collections
    return res.status(200).json({ cards })
    
  // } catch (error) {
  //   const cards = _.sampleSize(req.cards.filter(x => x.level < 4), 12)
  //   return res.status(200).json({ cards, cols: req.collections })
  // }
}

export default withMongo(withData(handler))
