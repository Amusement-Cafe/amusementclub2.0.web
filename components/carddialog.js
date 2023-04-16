import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import { Close } from '@mui/icons-material';
import { Avatar, Button, Dialog, DialogTitle } from '@mui/material';

function CardDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">{selectedValue.name}</DialogTitle>
      <img src={selectedValue.url}/>
      <Button onClick={handleClose}>
        <Avatar>
          <Close />
        </Avatar>
      </Button>
    </Dialog>
  );
}

export default CardDialog
