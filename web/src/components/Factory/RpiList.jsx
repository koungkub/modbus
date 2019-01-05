import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import RpiPanel from './RpiPanel';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

const RpiList = ({ rpis = [], ...props }) => {
  const { classes } = props;
  return <div className={classes.root}>
      {rpis.map(rpi => (
        <RpiPanel key={rpi.id} rpi={rpi} classes={classes} />
      ))}
    </div>;
}

RpiList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RpiList);
