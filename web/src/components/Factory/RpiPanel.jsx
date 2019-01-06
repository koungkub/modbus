import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  withStyles,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Button,
  Divider,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withSnackbar } from 'notistack';
import ChannelEditorialDialog from './ChannelEditorialDialog';
import AddChannelDialog from './AddChannelDialog';
import { ChannelService, RpiService } from '../../service';
import { getFactory } from '../../redux/factory/action';


const styles = theme => ({
  root: {
    width: '100%',
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
  details: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  columnOffset: {
    flexBasis: '33.33%',
  },
  column: {
    flexBasis: '60.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  channel: {
    marginBottom: 20,
  },
});

class RpiPanel extends Component {
  state = {
    openDialog: false,
    addChannelDialog: false,
  };

  handleEditorialDialog = openDialog => this.setState({ openDialog });

  handleAddChannelDialog = addChannelDialog =>
    this.setState({ addChannelDialog });

  handleSubmit = async (rpi, channels) => {
    const { enqueueSnackbar } = this.props;
    const rpiPromise = RpiService.update(rpi);
    const channelPromises = channels.map(data => ChannelService.update(data));
    const done = await Promise.all([rpiPromise, ...channelPromises]);
    this.props.getFactory(rpi.factory_id);
    enqueueSnackbar('Successfully updated the data.', { variant: 'success' });
  };

  handleAddChannel = async (channel) => {
    const { enqueueSnackbar, rpi } = this.props
    await ChannelService.add(rpi.id, channel)
    this.props.getFactory(rpi.factory_id);
    enqueueSnackbar('Successfully added the channel.', { variant: 'success' });
  }

  render() {
    const { classes, rpi } = this.props;
    const { openDialog, addChannelDialog } = this.state;
    return (
      <ExpansionPanel key={rpi.id}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>RPI# {rpi.id}</Typography>
          <Typography className={classes.secondaryHeading}>
            MAC Address: {rpi.mac_address} &nbsp;&nbsp; &nbsp;&nbsp; Modbus IP:{' '}
            {rpi.modbus_ip}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.columnOffset} />
          <div className={classes.column}>
            {rpi.Channels.map(channel => (
              <div className={classes.channel} key={channel.id}>
                <Typography variant="h6" gutterBottom>
                  Channel: {channel.channel}
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={16}
                >
                  <Grid item xs={3}>
                    In Min: {channel.in_min}
                  </Grid>
                  <Grid item xs={3}>
                    In Max: {channel.in_max}
                  </Grid>
                  <Grid item xs={3}>
                    Out Min: {channel.out_min}
                  </Grid>
                  <Grid item xs={3}>
                    Out Max: {channel.out_max}
                  </Grid>
                </Grid>
              </div>
            ))}
          </div>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button
            size="small"
            color="primary"
            onClick={() => this.handleAddChannelDialog(true)}
          >
            เพิ่ม Channel
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.handleEditorialDialog(true)}
          >
            แก้ไข
          </Button>
        </ExpansionPanelActions>
        <ChannelEditorialDialog
          open={openDialog}
          rpi={rpi}
          handleClose={() => this.handleEditorialDialog(false)}
          handleSubmit={this.handleSubmit}
        />
        <AddChannelDialog
          open={addChannelDialog}
          rpi={rpi}
          handleClose={() => this.handleAddChannelDialog(false)}
          handleSubmit={this.handleAddChannel}
        />
      </ExpansionPanel>
    );
  }
}

RpiPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  getFactory: factoryId => dispatch(getFactory(factoryId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(withStyles(styles)(RpiPanel)));