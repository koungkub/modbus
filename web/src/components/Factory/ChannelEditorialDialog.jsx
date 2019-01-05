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


class ChannelEditorialDialog extends Component {
  state = { open: false, rpi: {} };

  componentDidMount() {
    const {
      rpi: {
        Channels,
      },
      rpi,
    } = this.props;
    this.setState({ rpi, Channels: this.toHashMap(Channels) });
    console.log(this.toHashMap(Channels))
    console.log('rpi', rpi);
    console.log('Channels', Channels);
  }

  handleChange = name => event => {
    this.setState({
      rpi: {
        ...this.state.rpi,
        [name]: event.target.value,
      }
    });
  };

  toHashMap = arr => {
    const map = {};
    for (let obj of arr) {
      map[obj.id] = obj
    }
    return map
  }

  handleChannelChange = (channelId, name) => event => {
    const channel = this.state.Channels[channelId]
    channel[name] = event.target.value

    this.setState({
      ...this.state,
    });
  };

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    const { rpi, Channels } = this.state;

    console.log('handleSubmit["rpi"]', rpi)
    console.log('handleSubmit["Channels"]', Channels)

    if (handleSubmit) {
      handleSubmit(rpi, Object.values(Channels));
    }
  };

  render() {
    const { handleClose, open, classes } = this.props;
    const { rpi, Channels } = this.state;

    return <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          RPI# {rpi.id} : แก้ไขข้อมูล
        </DialogTitle>
        <DialogContent>
          <div>
            <Typography className={classes.heading}>Rasberry Pi</Typography>
            <TextField id="mac-address" label="Mac Address" className={classes.textField} value={rpi.mac_address} onChange={this.handleChange('mac_address')} margin="normal" />
            <TextField id="modbus-ip" label="Modbus IP" className={classes.textField} value={rpi.modbus_ip} onChange={this.handleChange('modbus_ip')} margin="normal" />
          </div>
          <div>
            {rpi.Channels && rpi.Channels.map(channel => (
              <div key={channel.id}>
                <Typography className={classes.secondaryHeading}>
                  Channel #{channel.id}
                </Typography>
                <TextField id="in-min" label="In Min" className={classes.textField} value={Channels[channel.id].in_min} onChange={this.handleChannelChange(channel.id, 'in_min')} margin="normal" />
                <TextField id="in-max" label="In Max" className={classes.textField} value={Channels[channel.id].in_max} onChange={this.handleChannelChange(channel.id, 'in_max')} margin="normal" />
                <TextField id="out-min" label="Out Min" className={classes.textField} value={Channels[channel.id].out_min} onChange={this.handleChannelChange(channel.id, 'out_min')} margin="normal" />
                <TextField id="out-max" label="Out Max" className={classes.textField} value={Channels[channel.id].out_max} onChange={this.handleChannelChange(channel.id, 'out_max')} margin="normal" />
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={this.handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>;
  }
}

ChannelEditorialDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChannelEditorialDialog);