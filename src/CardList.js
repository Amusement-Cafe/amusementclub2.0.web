import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel, 
  InputBase, 
  Select,
  Grid,
  Card,
  CardMedia,
  Container,
} from '@mui/material';

const CardList = ({cards, cols}) => {
    //const cols = props.cols || []
  
    const [col, setCol, sort, setSort] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState({});
    
    React.useEffect(() => {
      //setSort('date')
    }, []);
  
    const handleColChange = name => event => {
      setCol(event.target.value)
    }
  
    const handleSortChange = name => event => {
      setSort(event.target.value)
    }
  
    const handleClickOpen = (card) => {
      setOpen(true);
      setSelectedValue(card)
    }
  
    const handleClose = (value) => {
      setOpen(false);
    }
  
    //const [isHover, setIsHover] = useState(false)
    // {"name":"nagisas_leisure","level":1,"animated":false,"col":"clannad"}
    const cap = (str) => str.split(' ').map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' ')

  
    return (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
        {cards.map((card) => {
          const col = cols.find(x => x.id == card.col)
          const url = `https://cdn.amusement.cafe/cards/${card.col}/${card.level}_${card.name}.${card.animated? 'gif' : (col.compressed? 'jpg' : 'png')}`
          return (
            <Grid item key={card.url} xs={6} sm={4} md={3} lg={2}>
              <Card>
                <CardMedia component="img" src={url} />
              </Card>
            </Grid>
          );
        })}
      </Grid>

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