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

const CardPopup = ({card, onClose, open}) => {
  if (!card) {
    return (
      <MDTypography variant="button" fontWeight="regular">
        Undefined card
      </MDTypography>
    )
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <Card sx={{width: '100%', height: '100%'}}>
        <CardMedia component="img" src={card.url} alt={card.name}/>
        <CardContent>
          <MDTypography mt={3} variant="h4">
            {formatCardName(card)}
          </MDTypography>
        </CardContent>
      </Card>
    </Dialog>
  );
}

export default CardPopup
