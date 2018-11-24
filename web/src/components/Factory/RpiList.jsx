import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

const RpiList = ({ rpis = [], ...props }) => {
  const { classes } = props;
  return <div className={classes.root}>
    {rpis.map(rpi => <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>RPI#{rpi.id}</Typography>
          <Typography className={classes.secondaryHeading}>
            MAC Address: {rpi.mac_address} &nbsp;&nbsp;  &nbsp;&nbsp; Modbus IP: {rpi.modbus_ip}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.columnOffset} />
          <div className={classes.column}>
            {rpi.Channels.map(channel => (
              <div className={classes.channel} key={channel.id}>
                <Typography variant="h6" gutterBottom>
                  Channel ID: {channel.channel}
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={40}
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
        <ExpansionPanelActions />
      </ExpansionPanel>)}
  </div>;
}

RpiList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RpiList);
