import { alpha, makeStyles } from '@material-ui/core/styles'
import fetch from 'isomorphic-unfetch'
import getHost from '../utils/get-host'
import { useMediaQuery } from 'react-responsive'

import Layout from '../components/layout'
import Footer from '../components/footer'

import { 
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grow: {
    display: 'inline-block',
    flexGrow: 1,
  },

  title: {
    marginTop: 'auto',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: '45px',
    backgroundColor: '#222',
    padding: '5px',
  },

  textWithBack: {
    backgroundColor: '#222',
    textAlign: 'center',
    color: '#fff',
  },

  alert: {
    display: 'block',
    textAlign: 'center',
    padding: '10px',
    fontWeight: 800,
  },

  success: {
    backgroundColor: 'rgb(45, 114, 48)'
  },

  error: {
    backgroundColor: 'rgb(167, 35, 35)'
  },

  button: {
    display: 'flex',
    margin: 'auto',
    left: 0,
    right: 0,
  },

  buttonspan: {
    fontWeight: 400,
    fontSize: '1rem',
    color: '#FFF',
  },

  card: {
    width: '100%',
    margin: 0,
    borderRadius: '1rem',
    transition: '.25s',
  },

  cardSmall: {
    width: '30%',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: '0.1s',
    }
  },

  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    margin: '0 15%',
  },

  cardTitle: {
    fontWeight: 800,
    width: '100%',
    margin: 'auto',
    marginBottom: '15px',
    textAlign: 'center',
  },

  cardHover: {
    cursor: 'pointer',
    transition: '.25s',
  },

  gridTitleBar: {
    opacity: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: '15px',

    '&:hover' : {
      opacity: 1,
      cursor: 'pointer',
      transition: '.25s',
    }
  },

  gridTitleBarHover: {
    opacity: 1,
    cursor: 'pointer',
    transition: '.25s',
  },

  gridTitleRibbon: {
    marginTop: '20px',
    backgroundColor: 'rgb(46, 153, 136)',
  },
}));

const successMessage = ''
const errorMessage = 'If this issue persists, please let us know through our support Discord (https://amusement.cafe).'

const Vote = props => {
  const classes = useStyles()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  const cap = (str) => str.split(' ').map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' ')
  const cards = props.cards.filter(x => x)
  const success = props.status == 'ok'
  const defaultPage = props.status == 'default'

  console.log(cards)

  let alert, page;

  if (props.message)
  {
    const msg = `${props.message}.\n ${success? successMessage : errorMessage}`
    alert = <div className={`${classes.alert} ${success? classes.success : classes.error}`}>{msg}</div>
  }
  
  if(defaultPage) {
    page =
    (<div>
      <div style={{height: '50px'}}></div>
      <h1 className={classes.title}>Vote for the next special cards!</h1>
      <h2 className={classes.textWithBack}>Run /vote in Amusement Club bot to get your special voting link.</h2>
      <div className={classes.cardContainer}>
        <img src={cards[0].url} className={classes.cardSmall}/>
        <img src={cards[1].url} className={classes.cardSmall}/>
        <img src={cards[2].url} className={classes.cardSmall}/>
      </div>
      <div style={{height: '50px'}}></div>
    </div>)
  } else {
    page = 
    (<div>
      <h2>{props.results? 'Results for 2023' : 'Vote for the next special cards!'}</h2>
      <span>{props.results? 'Cards are sorted by the amount of votes.' : 'You can vote once every 12 hours. Vote for any card that you like. Top voted cards will be added to bot once Cinnabar update is out! Please, make sure to generate a special link with /vote from Amusement Club bot because old links will not work!'}</span>

      <div style={{height: '25px'}}></div>
      <GridList spacing={25} cellHeight={'auto'} cols={isTabletOrMobile? 2 : 4}>
      {cards.map((x, i) => (
        <GridListTile key={x.url}>
          <img src={x.url} className={classes.card}/>
          <GridListTileBar
            className={classes.gridTitleBar}
            title={
              <div className={classes.cardTitle}>
                {cap(x.name.split('.')[0].replace(/_/g, ' '))}<br/>
                { props.results? `votes: ${x.votes}` : ``}
              </div>
            }
            subtitle={
              props.message? '' :
              <Button color="primary" variant="contained" size="small" className={classes.button}>
                <a href={`?token=${props.token}&id=${x.id}`}>
                  <span className={classes.buttonspan}>vote</span>
                </a>
              </Button>
            }
          />
        </GridListTile>
      ))}
      </GridList>
    </div>)
  }

  return (
    <Layout>
      <div style={{height: '75px'}}></div>

      {alert}
      
      {page}

      <Footer/>
    </Layout>
  )
}

Vote.getInitialProps = async ctx => {
  const apiUrl = getHost(ctx.req) + '/api/vote'

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Data: JSON.stringify({ token: ctx.query.token, id: ctx.query.id })
      },
    })

    if (response.ok) {
      const js = await response.json()
      js.token = ctx.query.token
      return js

    } else {
      throw new Error(response.statusText)
    }
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default Vote
