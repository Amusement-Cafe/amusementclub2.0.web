import withData from '../../middlewares/withData';
import _ from "lodash"

const handler = async (req, res) => {
  const data = await req.headers.data

  //try {
    const json = JSON.parse(data)
    const token = json.token
    const voteId = json.id

    console.log(`Request with token: ${token}`)
    console.log(`Request with ID: ${voteId}`)

    // TODO check token in DB

    const cards = _.shuffle(req.specials)
    return res.status(200).json({ status: "ok", cards })
    
//   } catch (error) {
//     const cards = _.sampleSize(req.specials, 3)
//     return res.status(200).json({ status: error, cards })
//   }
}

export default withData(handler)
