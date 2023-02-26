import { fade, makeStyles } from '@material-ui/core/styles'
import fetch from 'isomorphic-unfetch'
import getHost from '../utils/get-host'
import { useMediaQuery } from 'react-responsive'

import Layout from '../components/layout'
import CardDialog from '../components/carddialog'
import Footer from '../components/footer'

import { 
  Alert,
  Snackbar,
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
  }
}));

const Vote = props => {
  const classes = useStyles()
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
  const cap = (str) => str.split(' ').map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' ')
  const cards = props.cards.filter(x => x)

  return (
    <Layout>
      <Snackbar open={open} autoHideDuration={10000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>

      <div style={{height: '75px'}}></div>

      <h2>Vote for the next special card!</h2>
      <span>You can vote once every 12 hours. Vote for any card that you like and it might be added to the bot after voting is over!</span>

      <div style={{height: '25px'}}></div>
      <GridList spacing={25} cellHeight={'auto'} cols={isTabletOrMobile? 2 : 4}>
      {cards.map((x, i) => (
        <GridListTile key={x.url}>
          <img src={x.url} className={classes.card}/>
          <GridListTileBar
            //onClick={() => handleClickOpen(x)}
            className={classes.gridTitleBar}
            title={
              <div className={classes.cardTitle}>{cap(x.name.split('.')[0].replace(/_/g, ' '))}</div>
            }
            subtitle={
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

      {/*<CardDialog selectedValue={selectedValue} open={open} onClose={handleClose} />*/}
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
