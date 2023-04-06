
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const withDatabase = handler => async (req, res) => {
  await client.connect();
  req.db = client.db('amusement2')
  return handler(req, res)
}

export default withDatabase
