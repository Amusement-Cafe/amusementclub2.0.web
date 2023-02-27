
import cards from '../test/data/cards'
import collections from '../test/data/collections'
import specials23 from '../test/data/specials23'

const baseURL = `https://amusement2-1a87e.kxcdn.com`
const specialsURL = `${baseURL}/web/votes/special23`

cards.map(x => {
    const col = collections.filter(y => y.id == x.col)[0]
    x.url = `${baseURL}/cards/${col.id}/${x.level}_${x.name}.${x.animated? 'gif' : (col.compressed? 'jpg' : 'png')}`
})

const specials = specials23.map((x, i) => ({
    id: i,
    name: x,
    url: `${specialsURL}/4_${x}`
}))

const withData = handler => (req, res) => {
    req.cards = cards
    req.collections = collections
    req.specials = specials
    return handler(req, res)
}

export default withData
