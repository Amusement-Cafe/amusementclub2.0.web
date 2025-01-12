//--

import React from 'react'
import Layout from '../components/layout'
import { makeStyles } from '@material-ui/core/styles'
import { Parallax, Background } from 'react-parallax'
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
    margin: '0 4em',
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
    backgroundImage: 'url("https://a.amu.cards/web/Cinnabar_final_crop.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
  },

  titleContainer: {
    marginTop: '60%',
  },

  title: {
    marginTop: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: '4em',
    backgroundColor: '#222',
    padding: '0.1em',
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
      <Parallax strength={500}>
        <Background style={{width: '100px'}} bgImageAlt="cinnabar">
          <img src="https://a.amu.cards/web/cinnabar_BG.png" />
        </Background>

        <Parallax strength={300}>
        <Background bgImageAlt="cinnabar">
          <img src="https://a.amu.cards/web/cinnabar_FG.png" />
        </Background>
        <div className={classes.titleContainer}>

          <h1 className={classes.title}>Amusement Club</h1>
          <h2 className={classes.textWithBack}>Discord trading card bot with over 20,000 cards.</h2>
          <h3 className={classes.desc}>Claim and create cards, choose your hero character, craft various effects and trade on auctions. 
          All of your cards are persistent across all Discord servers.</h3>
          
          <Button color="primary" variant="contained" size="large" className={classes.button} startIcon={
              <img style={{height: '30px'}} src="https://a.amu.cards/web/Discord-Logo-White.svg"/>
            }>
            <a href="https://docs.amu.cards/en/getting-started/howto-play">
              <span className={classes.buttonspan}>get started</span>
            </a>
          </Button>

          <div style={{height: '20px'}}></div>

          <div className={classes.cardContainer}>
            <img src={cards[0].url} className={classes.card}/>
            <img src={cards[1].url} className={classes.card}/>
            <img src={cards[2].url} className={classes.card}/>
          </div>

          <Button color="secondary" variant="text" size="medium" className={classes.button}>
            <a href="/cards">
              <span>view more cards...</span>
            </a>
          </Button>

        </div>
        </Parallax>
      </Parallax>

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
