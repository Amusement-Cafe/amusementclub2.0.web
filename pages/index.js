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
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Dashboard from '../src/Dashboard'
import CardList from '../src/CardList';
import CardForm from '../src/CardForm'
import { Button } from '@mui/material';

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
  
  const { data: session } = useSession()
  const [cards, setCards] = React.useState([])
  const [collections, setCollections] = React.useState(props.cols)
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState({});

  const onQueryChanged = (newQuery) => {
    fetchCards(newQuery, 1)
  }

  const fetchCards = async (currentQuery, page) => {
    const response = await fetch(`/api/cards?collection=${currentQuery.collection}&keywords=${currentQuery.keywords}`, 
    {
      headers: {
        Data: JSON.stringify({
          collection: currentQuery.collection,
          keywords: currentQuery.keywords,
          sort: currentQuery.sort,
          page,
          userId: session.user.id,
        })
      },
    });

    const data = await response.json();

    if(page == 1) {
      setCards(data.cards)
    }
    else {
      setCards([...cards, ...data.cards])
    }

    console.log(data.cards.length)
    setQuery(currentQuery)
    setPage(page)
  };

  // const trigger = useScrollTrigger();

  // React.useEffect(() => {
  //   const handleScroll = event => {
  //     console.log('scroll!')
  //     const windowHeight = window.innerHeight;
  //     const scrollTop = document.documentElement.scrollTop;
  //     const fullHeight = document.documentElement.offsetHeight;
  
  //     if (windowHeight + scrollTop >= fullHeight) {
  //       //onScrollToBottom();
  //       console.log('bottom!')
  //     }
  //   }

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);    

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Dashboard title='Your Cards'>
          <CardForm cols={collections} onQueryChanged={onQueryChanged}/>
          <CardList cards={cards} cols={collections}/>
          <Box textAlign='center'>
            <Button onClick={() => fetchCards(query, page + 1)} variant="contained">Load more</Button>
          </Box>
        </Dashboard>
      </Box>
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
