import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogTitle, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

const emptyChannel = {
      in_max: '',
      in_min: '',
      out_max: '',
      out_min: '',
      channel: '',
    }

class AddChannelDialog extends Component {
  
  constructor(props) {
    super(props)

    this.state = { open: false, channel: emptyChannel};
  }

  handleChange = name => event => {
    const channel = {
      ...this.state.channel, 
      [name]: event.target.value,
    }
    this.setState({ channel });
  };

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    const { channel } = this.state;

    if (handleSubmit) {
      handleSubmit(channel);
    }
  };

  empty = () => {
    this.setState({ channel: emptyChannel })
  }

  handleClose = () => {
    const { handleClose } = this.props;

    this.empty()

    if (handleClose) {
      handleClose();
    }
  }

  render() {
    const { open, classes, rpi } = this.props;
    const { channel } = this.state;

    return <Dialog open={open} onClose={this.handleClose} fullWidth={true} maxWidth={"md"} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          RPI# {rpi.id} : เพิ่ม Channel
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField id="in-min" label="In Min" className={classes.textField} value={channel.in_min} onChange={this.handleChange('in_min')} margin="normal" />
            <TextField id="in-max" label="In Max" className={classes.textField} value={channel.in_max} onChange={this.handleChange('in_max')} margin="normal" />
            <TextField id="out-min" label="Out Min" className={classes.textField} value={channel.out_min} onChange={this.handleChange('out_min')} margin="normal" />
            <TextField id="out-max" label="Out Max" className={classes.textField} value={channel.out_max} onChange={this.handleChange('out_max')} margin="normal" />
            <TextField id="channel" label="ช่อง Channel" className={classes.textField} value={channel.channel} onChange={this.handleChange('channel')} margin="normal" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>;
  }
}

AddChannelDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddChannelDialog);