import React from 'react'
import Layout from '../components/layout'
import { makeStyles } from '@material-ui/core/styles'
import getHost from '../utils/get-host'

import { 
  Button,
  Icon,
  Avatar
} from '@material-ui/core'
import { random } from 'lodash'

const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    padding: '15px',
    color: '#fff',
    margin: '50px auto',
    left: 0,
    right: 0,
  },

  buttonspan: {
    fontWeight: 600,
    fontSize: '1.5rem',
    verticalAlign: 'top',
    marginLeft: '20px',
    background: 'radial-gradient(#eb2196, #0d4acf, #2b9ab5)',
    backgroundSize: '500% 500%',
    backgroundClip: 'text',
    '-webkit-background-clip': 'text',
    textFillColor: 'transparent',
    animation: `$shine 60s linear infinite`,
  },

  '@keyframes shine': {
    'to': {
      backgroundPosition: '800% 800%',
    }
  },

  avatar: {
    margin: 'auto',
    left: 0,
    right: 0,
    height: '100px',
    width: '100px',
  },

  h2: {
    color: '#fff',
  },

  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    margin: '0 15%',
  },

  card: {
    width: '30%',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.1)',
      transition: '0.3s',
    }
  }

}))

const Home = props => {
  const cards = props.cards.filter(x => x)
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.cardContainer}>
        <img src={cards[0].url} className={classes.card}/>
        <img src={cards[1].url} className={classes.card}/>
        <img src={cards[2].url} className={classes.card}/>
      </div>

      <div style={{height: '50px'}}></div>
      {
        Math.random() > 0.5 ? (
          <Avatar className={classes.avatar} src="https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/amethystpfp.jpg"/>
        ) : (
          <Avatar className={classes.avatar} src="https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/amethyst2.jpg"/>
        )
      }

      <h1 style={{'textAlign': 'center'}}>Amusement Club: Global card trading for Discord</h1>
      <h3 style={{'textAlign': 'center'}}>Choose from thousands of community crafted cards to trade and auction.</h3> 
      <h3 style={{'textAlign': 'center'}}>All your progress is transferred between Discord servers</h3>
      
      <Button color="primary" variant="outlined" className={classes.button} startIcon={
          <img src="https://amusementclub.nyc3.digitaloceanspaces.com/web/discord_logo.svg"/>
        }>
        <a href="https://discordapp.com/oauth2/authorize?client_id=340988108222758934&scope=bot&permissions=126017">
          <span className={classes.buttonspan}>Add to Discord</span>
        </a>
      </Button>

      <div style={{'height': '500px'}}></div>
    </Layout>
  )
}

Home.getInitialProps = async ctx => {
  const apiUrl = getHost(ctx.req) + '/api/home'

  try {
    const response = await fetch(apiUrl)

    if (response.ok) {
      const js = await response.json()
      js.type = ctx.query.type
      return js

    } else {
      throw new Error(response.statusText)
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default Home
