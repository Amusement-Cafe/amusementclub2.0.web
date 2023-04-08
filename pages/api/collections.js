
import withData from '../../middlewares/withData';

const handler = async (req, res) => {
    return res.status(200).json({ cols: req.collections })
}

export default withData(handler)
