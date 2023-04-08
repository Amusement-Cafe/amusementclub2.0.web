//--

import React from 'react'
import getHost from '../utils/get-host'
import { getServerSession } from "next-auth/next"
import { useSession } from 'next-auth/react';
import { getToken } from "next-auth/jwt"
import { authOptions } from './api/auth/[...nextauth]'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { red, cyan, blueGrey } from '@mui/material/colors';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Dashboard from '../src/Dashboard'
import CardList from '../src/CardList';
import CardForm from '../src/CardForm'

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

const mdTheme = createTheme({
  palette: {
    primary: {
      main: blueGrey[300],
    },
    secondary: {
      main: cyan[500],
    },
  },
});

const Home = props => {
  
  const { data: session } = useSession()
  const [cards, setCards] = React.useState([])
  const [collections, setCollections] = React.useState(props.cols)

  const onCardsChanged = (data) => {
    setCards(data.cards)
    setCollections(data.cols)
    console.log(data.cards.length)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Dashboard title='Your Cards'>
          <CardForm cols={collections} session={session} onCardsChanged={onCardsChanged}/>
          <CardList cards={cards} cols={collections}/>
        </Dashboard>
      </Box>
    </ThemeProvider>
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
  const apiUrl = getHost(req) + '/api/collections'
  
  let response
  let session = await getServerSession(req, res, authOptions)

  if(session) {
    session.user.email = null

    const token = await getToken({ req: req })

    if (token && token.sub && session.user) {
      session = {
        ...session,
        user: {
          ...session.user,
          id: token.sub
        }
      }
    }
  }

  response = await fetch(apiUrl)

  if (!response.ok) {
    return {}
  }

  const js = await response.json()

  return {
    props: {
      cols: js.cols,
      session,
    }
  }
}

export default Home
