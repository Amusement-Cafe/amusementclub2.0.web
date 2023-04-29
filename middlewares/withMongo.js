
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const withDatabase = handler => async (req, res) => {
  try {
    await client.connect();
    req.db = client.db('amusement2')
    return handler(req, res)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

export default withDatabase
