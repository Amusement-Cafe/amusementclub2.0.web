import React from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
import Layout from '../components/layout'
import { withStyles } from '@material-ui/core/styles'
import getHost from '../utils/get-host'

const styles = {
  button: {
    'display': 'block',
    'background-color': '#222',
    'font-size': '25px',
    'font-weight': 600,
    'padding': '15px',
    'color': '#fff',
    'margin': '50px auto',
    'left': 0,
    'right': 0,
    '&:hover': {
      'background-color': '#444',
    }
  },

  buttonimg: {
    'vertical-align': 'bottom',
    'margin-right': '15px',
  },

  'buttonspan': {
    'display': 'block',
    'vertical-align': 'top',
    'background': 'radial-gradient(#eb2196, #0d4acf, #2b9ab5)',
    'background-size': '500% 500%',
    'background-clip': 'text',
    'text-fill-color': 'transparent',
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',
    'animation': 'shine 45s linear infinite',
  },

  avatar: {
    'margin': 'auto',
    'left': 0,
    'right': 0,
    'height': '100px',
    'width': '100px',
  },
}

const Home = props => {
  const cards = props.cards.filter(x => x)
  const { classes } = props;

  return (
    <Layout>
      <div className="container">
        <div className="cardContainer">
          <img src={cards[0].url} className='card'/>
          <img src={cards[1].url} className='card'/>
          <img src={cards[2].url} className='card'/>
        </div>

        <div style={{height: '50px'}}></div>
        <Avatar className={props.classes.avatar} src="https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/alexandritepfp.jpg"/>

        <h1 style={{'textAlign': 'center'}}>Amusement Club: Global Gacha for Discord</h1>
        <h3 style={{'textAlign': 'center'}}>Claim and create cards, build your guild, choose your hero character craft various effects and trade on auctions. 
          All your progress is transferred between Discord servers</h3>

        
        <Button variant="contained" className={props.classes.button}>
          <a href="https://discordapp.com/oauth2/authorize?client_id=340988108222758934&scope=bot&permissions=126017">
            {/*<Icon className={props.classes.buttonimg}><img src="https://amusementclub.nyc3.digitaloceanspaces.com/web/discord_logo.svg"/></Icon>*/}
            <span className='buttonspan'>Add to Discord</span>
          </a>
        </Button>
        
      </div>
        
    <style jsx>{`

      .back {
        
      }

      .container {
        width: 100%;
        margin: auto;
        color: #fff;
      }

      .cardContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        margin: 0 20%;
      }

      .cardContainer .card {
        width: 30%;
      }

      h2 {
        color: #fff;
      }

      .buttonspan {
        display: block;
        vertical-align: top;
        background: radial-gradient(#eb2196, #0d4acf, #2b9ab5); 
        background-size: 800% 800%;
        background-clip: text;
        text-fill-color: transparent;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shine 60s alternate infinite;
      }

        @keyframes shine {
          to {
            background-position: 800% 800%;
          }
        }
      `}</style>
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

export default withStyles(styles)(Home)
