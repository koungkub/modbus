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

const emptyRpi = {
      modbus_ip: '',
      mac_address: '',
    }

class AddRpiDialog extends Component {
  
  constructor(props) {
    super(props)

    this.state = { open: false, rpi: empty};
  }

  handleChange = name => event => {
    const rpi = {
      ...this.state.rpi, 
      [name]: event.target.value,
    }
    this.setState({ rpi });
  };

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    const { rpi } = this.state;

    if (handleSubmit) {
      handleSubmit(rpi);
    }
  };

  empty = () => {
    this.setState({ rpi: emptyRpi })
  }

  handleClose = () => {
    const { handleClose } = this.props;

    this.empty()

    if (handleClose) {
      handleClose();
    }
  }

  render() {
    const { open, classes } = this.props;
    const { rpi } = this.state;

    return <Dialog open={open} onClose={this.handleClose} fullWidth={true} maxWidth={"md"} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          เพิ่ม Raspberry Pi
        </DialogTitle>
        <DialogContent>
          <div>
            <TextField id="mac-address" label="Mac Address" className={classes.textField} value={rpi.mac_address} onChange={this.handleChange('mac_address')} margin="normal" />
            <TextField id="modbus-ip" label="Modbus IP" className={classes.textField} value={rpi.modbus_ip} onChange={this.handleChange('modbus_ip')} margin="normal" />
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

AddRpiDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddRpiDialog);