import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';

import MDBox from 'components/MDBox';
import MDBadge from 'components/MDBadge';
import MDAvatar from 'components/MDAvatar';
import MDTypography from 'components/MDTypography';

import {formatCardName} from 'utils'
import Countdown from 'react-countdown';
import InlineCopyItem from 'Items/InlineCopyItem';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import CountdownItem from 'Items/CountdownItem';

const AuctionPopup = ({auction, onClose, open}) => {
  if (!auction) {
    return (
      <MDTypography variant="button" fontWeight="regular">
        No auction selected
      </MDTypography>
    )
  }

  const card = auction.card;

  return (
    <Dialog onClose={onClose} open={open}>
      <Card sx={{width: '100%', height: '100%'}}>
        <CardHeader
          avatar={
            <MDAvatar src={auction.author.avatar}>
              {auction.author.username[0]}
            </MDAvatar>
          }
          action={
            <IconButton aria-label="settings">
              <CancelIcon />
            </IconButton>
          }
          title={
            <MDTypography variant="text" fontWeight="bold">
              {`Auction ${auction.id}`}
            </MDTypography>
          }
          subheader={
            <MDTypography variant="text">
              {`by ${auction.author.username}`}
            </MDTypography>}
        />
        <CardMedia component="img" src={card.url} alt={card.name}/>
        <CardContent>
          <MDBox mb={3} />
          <MDTypography variant="h5">
            {formatCardName(auction.card)}
          </MDTypography>
          <MDBox mb={3} />
          <Grid container spacing={2} sx={{verticalAlign: "middle"}}>
            <Grid item xs={6}>
              <MDTypography variant="body2">
                ID (click to copy)
              </MDTypography>
            </Grid>
            <Grid item xs={6}>
              <InlineCopyItem text={auction.id} />
            </Grid>
            <Grid item xs={6}>
              <MDTypography variant="body2">
                Minimum bid
              </MDTypography>
            </Grid>
            <Grid item xs={6}>
              <MDTypography variant="body1" fontWeight="bold">
                {auction.price + 1 + " 🍅"} 
              </MDTypography>
            </Grid>
            <Grid item xs={6}>
              <MDTypography variant="body2">
                Ends in
              </MDTypography>
            </Grid>
            <Grid item xs={6}>
              <CountdownItem date={Date.parse(auction.expires)} >
                <MDBadge badgeContent="finished" color="success" size="sm" />
              </CountdownItem>
            </Grid>
          </Grid>
          <MDBox mt={3} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <InlineCopyItem text={`/auction bid auction_id: ${auction.id} price: ${auction.price + 1} `} />
            <MDTypography m={2} variant="caption">
              Click on this text to copy it to the clipboard. <br/> You can paste it into the chat with bot to bid.
            </MDTypography>
          </MDBox>
        </CardContent>
      </Card>
    </Dialog>
  );
}

export default AuctionPopup
