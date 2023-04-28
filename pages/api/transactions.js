
import withMongo from '../../middlewares/withMongo';
import withData from '../../middlewares/withData';

const handler = async (req, res) => {
    const userId = req.query.userId
    const include = req.query.include?.split(',')

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" })
    }

    if (!include) {
      return res.status(400).json({ error: "Includes are empty" })
    }

    const result = {}

    if (include.includes('transaction')) {
      result.transactions = (await req.db.collection('transactions')
        .find({
          $or: [
            { from_id: userId },
            { to_id: userId },
          ]
        }, { projection: { _id:0 }})
        .limit(50)
        .toArray())
        .map(doc => {
          doc.type = 'transaction'
          doc.date = doc.time
          doc.guild = doc.guild_id
          doc.cost = doc.price
          delete doc.time
          delete doc.guild_id
          delete doc.price
          return doc
        })
    }

    if (include.includes('claim')) {
      result.claims = (await req.db.collection('claims')
        .find({
          user: userId,
        }, { projection: { _id:0, lock: 0, user: 0 }})
        .limit(50)
        .toArray())
        .map(doc => {
          doc.type = 'claim'
          return doc
        })
    }

    return res.status(200).json(result)
}

export default withMongo(withData(handler))
