import React from 'react'
import { useMediaQuery } from 'react-responsive'

import CardDialog from './carddialog'

import { 
  MenuItem, 
  Button, 
  FormControl, 
  InputLabel, 
  InputBase, 
  Select,
  GridList,
  GridListTile,
  GridListTileBar,
  Container,
} from '@mui/material';

const CardList = props => {
    const classes = useStyles()
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 })
    const cols = props.cols || []
  
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
    const cap = (str) => str.split(' ').map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' ')
  
    return (
      <CardList>
        <GridList spacing={20} cellHeight={'auto'} cols={isTabletOrMobile? 2 : 4}>
          {props.cards.map((x, i) => (
            <GridListTile key={x.url} /*onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)*/>
              <img src={x.url} className={classes.card}/>
              <GridListTileBar
                    onClick={() => handleClickOpen(x)}
                    className={classes.gridTitleBar}
                    title={cap(x.name.replace(/_/g, ' '))}
                    subtitle={<span>from <b>{props.cols.find(y => y.id === x.col).name}</b></span>}
                  />
              {/*
                this.state.hover ? (
                  <GridListTileBar
                    className={classes.gridTitleBarHover}
                    title={cap(x.name.replace(/_/g, ' '))}
                    subtitle={<span>from <b>{props.cols.find(y => y.id === x.col).name}</b></span>}
                  />
                ) : (
                  <GridListTileBar
                    className={classes.gridTitleBar}
                    title={cap(x.name.replace(/_/g, ' '))}
                    subtitle={<span>from <b>{props.cols.find(y => y.id === x.col).name}</b></span>}
                  />
                )
              */}
            </GridListTile>
          ))}
        </GridList>
        <CardDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
      </CardList>
    )
  }
  
  export default CardList