
// import cards from '../../data/cards'
// import collections from '../../data/collections'
import items from 'data/items'
import quests from 'data/quests'

let cards, collections = []

const fetchData = async () => {
  cards = await (await fetch(process.env.CARDS_URL)).json()
  collections = await (await fetch(process.env.COLLECTIONS_URL)).json()

  cards.map(x => {
    const col = collections.filter(y => y.id == x.col)[0]
    x.colName = col.name
    x.url = `https://cdn.amusement.cafe/${col.promo?'promo':'cards'}/${x.col}/${x.level}_${x.name}.${x.animated? 'gif' : (col.compressed? 'jpg' : 'png')}`
  })

  collections.map(x => {
    x.url = `https://cdn.amusement.cafe/web/collections/${x.id}.jpg`
  })
}

const withData = handler => async (req, res) => {
  
  try {
    await fetchData()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }

  req.cards = cards
  req.collections = collections
  req.items = items
  req.quests = quests
  return handler(req, res)
}

export default withData
