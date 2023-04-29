
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const withDatabase = handler => async (req, res) => {
  const id = setTimeout(() => res.json({
    message: `DB connection timed out after 8 seconds. Using URI ${process.env.MONGODB_URI}`
  }), 8000)

  try {
    await client.connect();
    req.db = client.db('amusement2')
    clearTimeout(id)

    return handler(req, res)

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error })
  }
}

export default withDatabase
