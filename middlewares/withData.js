
import cards from '../../data/cards'
import collections from '../../data/collections'

const baseURL = `https://amusementclub.nyc3.digitaloceanspaces.com`
cards.map(x => {
    const col = collections.filter(y => y.id == x.col)[0]
    x.colName = col.name
    x.url = `https://cdn.amusement.cafe/${col.promo?'promo':'cards'}/${x.col}/${x.level}_${x.name}.${x.animated? 'gif' : (col.compressed? 'jpg' : 'png')}`
})

const withData = handler => (req, res) => {
    req.cards = cards
    req.collections = collections
    return handler(req, res)
}

export default withData
