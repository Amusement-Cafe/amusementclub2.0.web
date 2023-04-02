//--

import React from 'react'
import getHost from '../utils/get-host'
import { getServerSession } from "next-auth/next"
import { authOptions } from './api/auth/[...nextauth]'

import Dashboard from '../src/Dashboard'
import CardList from '../src/CardList';

// const useStyles = makeStyles(theme => ({
//   button: {
//     display: 'flex',
//     margin: '50px auto',
//     left: 0,
//     right: 0,
//   },

//   buttonspan: {
//     fontWeight: 800,
//     fontSize: '1.5rem',
//     verticalAlign: 'top',
//     marginLeft: '20px',
//     color: '#FFF',
//   },

//   avatar: {
//     margin: 'auto',
//     left: 0,
//     right: 0,
//     height: '100px',
//     width: '100px',
//   },

//   cardContainer: {
//     display: 'flex',
//     flexDirection: 'row',
//     flexWrap: 'nowrap',
//     justifyContent: 'space-between',
//     margin: '0 15%',
//   },

//   card: {
//     width: '30%',
//     transition: '0.3s',
//     '&:hover': {
//       transform: 'scale(1.05)',
//       transition: '0.1s',
//     }
//   },

//   background: {
//     left: 0,
//     right: 0,
//     width: '100%',
//     backgroundImage: 'url("https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/bort_crop-min.png")',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: '100%',
//   },

//   titleContainer: {
//     marginTop: '55%',
//   },

//   title: {
//     marginTop: 'auto',
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//     fontSize: '75px',
//     backgroundColor: '#222',
//     padding: '5px',
//   },

//   textWithBack: {
//     backgroundColor: '#222',
//     textAlign: 'center',
//     color: '#fff',
//   },

//   desc: {
//     margin: 'auto',
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//     width: '70%',
//     backgroundColor: '#222',
//   }

// }))

const Home = props => {
  // const cards = props.cards.filter(x => x)
  // const classes = useStyles();

  return (
    <div>
      <Dashboard props={props}/>
    </div>
  )
}

// Home.getInitialProps = async ctx => {
//   const apiUrl = getHost(ctx.req) + '/api/home'

//   try {
//     const response = await fetch(apiUrl)

//     if (response.ok) {
//       const js = await response.json()
//       js.type = ctx.query.type
//       return js

//     } else {
//       throw new Error(response.statusText)
//     }
//   } catch (error) {
//     console.error(error)
//     return {}
//   }
// }

export async function getServerSideProps({ req, res }) {
  const apiUrl = getHost(req) + '/api/cards'
  const session = await getServerSession(req, res, authOptions)
  let response
  //console.log(session)

  if(session) {
    session.user.email = null
    response = await fetch(apiUrl, { userId: session.user.id })
  }
  else {
    response = await fetch(apiUrl)
  }

  if (!response.ok) {
    return {}
  }

  const js = await response.json()

  return {
    props: {
      cards: js.cards,
      cols: js.cols,
      session,
    }
  }
}

export default Home
