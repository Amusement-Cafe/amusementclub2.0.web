import React from 'react'
import Layout from '../components/layout'
import { makeStyles } from '@material-ui/core/styles'
import getHost from '../utils/get-host'
import Footer from '../components/footer'

import { 
  Button,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  button: {
    display: 'flex',
    margin: '50px auto',
    left: 0,
    right: 0,
  },

  buttonspan: {
    fontWeight: 800,
    fontSize: '1.5rem',
    verticalAlign: 'top',
    marginLeft: '20px',
    color: '#FFF',
  },

  avatar: {
    margin: 'auto',
    left: 0,
    right: 0,
    height: '100px',
    width: '100px',
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
      transform: 'scale(1.05)',
      transition: '0.1s',
    }
  },

  background: {
    left: 0,
    right: 0,
    width: '100%',
    backgroundImage: 'url("https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/bort_crop-min.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
  },

  titleContainer: {
    marginTop: '55%',
  },

  title: {
    marginTop: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: '75px',
    backgroundColor: '#222',
    padding: '5px',
  },

  textWithBack: {
    backgroundColor: '#222',
    textAlign: 'center',
    color: '#fff',
  },

  desc: {
    margin: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    width: '70%',
    backgroundColor: '#222',
  }

}))

const Home = props => {
  const cards = props.cards.filter(x => x)
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.background}>
        <div style={{height: '50px'}}></div>
        <div className={classes.titleContainer}>

          <h1 className={classes.title}>/amusement</h1>
          <h2 className={classes.textWithBack}>Global card trading bot for Discord</h2>
          <h3 className={classes.desc}>Claim and create cards, choose your hero character, craft various effects and trade on auctions. 
          All of your cards are persistent across all Discord servers.</h3>
          
          <Button color="secondary" variant="contained" size="large" className={classes.button} startIcon={
              <img src="https://amusementclub.nyc3.digitaloceanspaces.com/web/discord_logo.svg"/>
            }>
            <a href="https://discordapp.com/oauth2/authorize?client_id=340988108222758934&scope=bot&permissions=126017">
              <span className={classes.buttonspan}>Add to Discord</span>
            </a>
          </Button>

          <div style={{height: '20px'}}></div>

          <div className={classes.cardContainer}>
            <img src={cards[0].url} className={classes.card}/>
            <img src={cards[1].url} className={classes.card}/>
            <img src={cards[2].url} className={classes.card}/>
          </div>
          
          <div style={{height: '50px'}}></div>

        </div>
      </div>

      <Footer/>
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
