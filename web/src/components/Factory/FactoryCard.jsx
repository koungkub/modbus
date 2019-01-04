import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Paper,
  Grid,
  withStyles
} from '@material-ui/core';

const styles = {
  root: {
    padding: '16px 20px 8px 20px',
    margin: '20px 0',
    '&:hover': {
      boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.4), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    },
  },
};

const FactoryCard = ({ classes, factory = {} }) => (
  <Paper className={classes.root}>
    <Grid container spacing={16}>
      <Grid item sm>
        <Typography variant="h6" gutterBottom>
          Name: <span>{factory.name}</span>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Address: <span>{factory.address}</span>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Tel: <span>{factory.tel}</span>
        </Typography>
      </Grid>
      <Grid item sm>
        <Typography variant="h6" gutterBottom>
          จำนวน RPi: <span>{factory.rpis && factory.rpis.length}</span>
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

FactoryCard.propTypes = {
  classes: PropTypes.object,
  factory: PropTypes.object,
};

export default withStyles(styles)(FactoryCard);