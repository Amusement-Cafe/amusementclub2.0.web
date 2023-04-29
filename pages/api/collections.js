
import withData from '../../middlewares/withData';

const handler = async (req, res) => {
    try {
        return res.status(200).json(req.collections)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error })
    }
}

export default withData(handler)
