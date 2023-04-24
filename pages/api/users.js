
import withData from '../../middlewares/withData';
import withMongo from '../../middlewares/withMongo';
import _ from "lodash"

const handler = async (req, res) => {

  //try {
    const users = await req.db.collection('webusers')
      .find({})
      .limit(100)
      .toArray()
    
    return res.status(200).json(users)
    
  // } catch (error) {

  // }
}

export default withMongo(handler)