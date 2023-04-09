import React from 'react'

import { 
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Box,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';

const CardList = ({cards, cols}) => {
    const [open, setOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState('')
  
    const handleClickOpen = (card) => {
      setOpen(true);
      setSelectedValue(card)
    }
  
    const handleClose = (value) => {
      setOpen(false);
    }
  
    //const [isHover, setIsHover] = useState(false)
    // {"name":"nagisas_leisure","level":1,"animated":false,"col":"clannad"}
    const cap = (str) => str.split('_').map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' ')

    return (
      <Box sx={{ m: 6 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 4, lg: 6 }}>
          {cards.map((card) => {
            const col = cols.find(x => x.id == card.col)
            const url = `https://cdn.amusement.cafe/${col.promo?'promo':'cards'}/${card.col}/${card.level}_${card.name}.${card.animated? 'gif' : (col.compressed? 'jpg' : 'png')}`
            return (
              <Grid item key={url} xs={1} sm={1} md={1} lg={1}>
                <Card sx={{transition: "transform 0.15s ease-in-out", "&:hover": { transform: "scale3d(1.05, 1.05, 1)" }, cursor: 'pointer'}}>
                  <CardMedia component="img" src={url} />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {cap(card.name)}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {col.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {card.fav && 
                      <IconButton aria-label="is favorited">
                        <FavoriteIcon />
                      </IconButton>
                    }
                    <Typography variant="body3" color="text.secondary">
                      x{card.amount}
                    </Typography>
                    <IconButton aria-label="share">
                      
                    </IconButton>
                    {/* <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>*/}
                  </CardActions> 
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      // <ImageList sx={{ height: 1000 }} cols={4} gap={10}>
      //   {cards.map((item) => (
      //     <ImageListItem key={item.url}>
      //       <img
      //         src={item.url}
      //         alt={item.name}
      //         loading="lazy"
      //       />
      //     </ImageListItem>
      //   ))}
      // </ImageList>

      // <CardList>
      //   <GridList spacing={20} cellHeight={'auto'} cols={isTabletOrMobile? 2 : 4}>
      //     {props.cards.map((x, i) => (
      //       <GridListTile key={x.url} /*onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)*/>
      //         <img src={x.url} className={classes.card}/>
      //         <GridListTileBar
      //               onClick={() => handleClickOpen(x)}
      //               className={classes.gridTitleBar}
      //               title={cap(x.name.replace(/_/g, ' '))}
      //               subtitle={<span>from <b>{props.cols.find(y => y.id === x.col).name}</b></span>}
      //             />
      //         {/*
      //           this.state.hover ? (
      //             <GridListTileBar
      //               className={classes.gridTitleBarHover}
      //               title={cap(x.name.replace(/_/g, ' '))}
      //               subtitle={<span>from <b>{props.cols.find(y => y.id === x.col).name}</b></span>}
      //             />
      //           ) : (
      //             <GridListTileBar
      //               className={classes.gridTitleBar}
      //               title={cap(x.name.replace(/_/g, ' '))}
      //               subtitle={<span>from <b>{props.cols.find(y => y.id === x.col).name}</b></span>}
      //             />
      //           )
      //         */}
      //       </GridListTile>
      //     ))}
      //   </GridList>
      //   <CardDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
      // </CardList>
    )
  }
  
  export default CardList