import React from 'react'
import {Button} from '@mui/material'

export default Home = cards => {
    const classes = useStyles();
  
    return (
    <div className={classes.background}>
          <div style={{height: '50px'}}></div>
          <div className={classes.titleContainer}>
  
            <h1 className={classes.title}>/amusement</h1>
            <h2 className={classes.textWithBack}>Global card trading bot for Discord</h2>
            <h3 className={classes.desc}>Claim and create cards, choose your hero character, craft various effects and trade on auctions. 
            All of your cards are persistent across all Discord servers.</h3>
            
            <Button color="secondary" variant="contained" size="large" className={classes.button} startIcon={
                <img style={{height: '30px'}} src="https://amusementclub.nyc3.cdn.digitaloceanspaces.com/web/Discord-Logo-White.svg"/>
              }>
              <a href="https://discord.com/api/oauth2/authorize?client_id=340988108222758934&permissions=0&scope=bot%20applications.commands">
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
    )
}
