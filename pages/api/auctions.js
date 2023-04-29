
import withData from '../../middlewares/withData';
import withMongo from '../../middlewares/withMongo';
import _ from "lodash"

const handler = async (req, res) => {
  try {
    const now = new Date()
    let auctions = await req.db.collection('auctions')
        .find({
            finished: false, 
            cancelled: false,
            expires: { $gt: now },
        }, { projection: { 
            _id:0, card:1, price:1, author:1, id:1, expires:1, guild:1,
        }})
        .sort({ expires: 1 })
        .limit(100)
        .toArray()

    const sellerIds = _.uniq(auctions.map(auction => auction.author));
    const sellers = await req.db.collection('users')
        .find({ discord_id: { $in: sellerIds } }, { _id:0, username:1, discord_id:1 })
        .toArray()

    auctions.map(auction => { 
      auction.card = req.cards.find(card => card.id === auction.card)
      auction.author = sellers.find(seller => seller.discord_id === auction.author)
    })

    return res.status(200).json(auctions)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

export default withMongo(withData(handler))
