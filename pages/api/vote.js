import withData from '../../middlewares/withData';
import _ from "lodash"

import fetch from 'node-fetch'

const endDate = new Date('2023-04-20');

const handler = async (req, res) => {
  const data = await req.headers.data

  try {
    const json = JSON.parse(data)
    const token = json.token
    const voteId = json.id
    const now = new Date()

    if(now > endDate)
    {
      const response = await fetch(`${process.env.AMUSE_ENDPOINT}/votes`, {
          method: 'get',
          headers: {'Content-Type': 'application/json'}
      })

      const voteResults = await response.json()

      const cards = req.specials.map((x, i) => ({
        name: x.name,
        id: x.id,
        url: x.url,
        votes: voteResults.find(y => y.vote == i)?.count || 0
      }))

      cards.sort((a, b) => b.votes - a.votes);

      return res.status(200).json({ status: 'ok', results: true, message: 'Voting has ended. Thank you for participation', cards })
    }

    if(!token && !voteId)
    {
      const cards = _.sampleSize(req.specials, 3)
      return res.status(200).json({ status: 'default', cards })
    }

    const response = await fetch(`${process.env.AMUSE_ENDPOINT}/specials`, {
        method: 'post',
        body: data,
        headers: {'Content-Type': 'application/json'}
    })

    console.log(`Request with token ${token} id ${voteId} response ${response.status}`)

    if(response.status == 403) {
      throw {message: 'Invalid or expired vote token' }
    }

    const cards = _.shuffle(req.specials)

    if (voteId != undefined) {
      const message = 'Your vote has been registered. Come back in 12 hours to cast another vote!'
      return res.status(200).json({ status: "ok", message, cards })
    }

    return res.status(200).json({ status: "ok", cards })
    
  } catch (error) {
    console.log(error)
    const cards = _.shuffle(req.specials)
    const message = error.message
    return res.status(200).json({ status: 'err', message, cards })
  }
}

export default withData(handler)
