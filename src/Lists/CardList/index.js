import React from 'react'

import { 
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Box,
  Icon,
  TextField,
  Typography,
  IconButton,
  Badge,
  Chip,
  Stack,
  Tooltip,
} from '@mui/material';

import {formatCardName} from 'utils'

import MDBox from "components/MDBox";
import MDButton from 'components/MDButton';
import MDTypography from "components/MDTypography";

import FavoriteIcon from '@mui/icons-material/Favorite';
import LockIcon from '@mui/icons-material/Lock';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import CardPopup from 'Popups/CardPopup';

const CardList = ({cards}) => {
  const [cardOpen, setCardOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  
    const viewCard = (card) => {
      setCardOpen(true);
      setSelectedCard(card);
    };
  
    const handleCardClose = () => {
      setCardOpen(false);
    };
  
    //const [isHover, setIsHover] = useState(false)
    // {"name":"nagisas_leisure","level":1,"animated":false,"col":"clannad"}

    return (
      <MDBox>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 2, md: 4, lg: 5 }}>
          {cards.map((card) => (
              <Grid item key={card.url} xs={1} sm={1} md={1} lg={1}>
                <Card sx={{
                    // transition: "transform 0.15s ease-in-out",
                    // "&:hover": {
                    //   transform: "scale3d(1.05, 1.05, 1)",
                    // },
                    cursor: 'pointer'
                  }} onClick={() => viewCard(card)}>
                  <CardMedia component="img" src={card.url} />
                  {/* <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {formatCardName(card)}
                    </Typography>
                  </CardContent> */}
                  <CardActions />
                  <MDBox justifyContent="center" right={0} position="absolute" mt={2} mr={-1.5}>
                    <Stack spacing={1}>
                      {card.amount && card.amount > 1 && 
                      <Tooltip title={`You have ${card.amount} copies`} placement="top-end">
                        <MDBox justifyContent="center" sx={{
                            display: 'flex',
                            width: 22,
                            height: 22,
                            borderRadius: 11,
                            backgroundColor: "#1A73E8",
                          }}>
                            <MDTypography color="white" variant="body2">
                              {card.amount}
                            </MDTypography>
                        </MDBox>
                      </Tooltip>
                      }
                      {card.fav &&
                      <Tooltip title="Favourited" placement="top-end">
                        <FavoriteIcon color='error' fontSize="medium"/>
                      </Tooltip>
                      }
                      {card.locked &&
                      <Tooltip title="Locked" placement="top-end">
                        <LockIcon color="success" fontSize="medium"/>
                      </Tooltip>
                      }
                    </Stack>
                  </MDBox>
                </Card>
              </Grid>
            )
          )}
        </Grid>
        <CardPopup card={selectedCard} open={cardOpen} onClose={handleCardClose} />
      </MDBox>
    )
  }
  
  export default CardList