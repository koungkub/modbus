import React from 'react';
import { Typography, withStyles } from '@material-ui/core';
import FactoryCard from './FactoryCard';
import RpiList from './RpiList';

const styles = () => ({
  clearfix: {
    marginBottom: 40,
  }
});

const FactoryPage = ({ factory, classes }) => {
  console.log(factory)
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        โรงงาน {factory.id}
      </Typography>
      <FactoryCard factory={factory} />
      <Typography variant="h5" gutterBottom>
        Raspberry Pi ที่ถูกติดตั้งในโรงงาน
      </Typography>
      <RpiList rpis={factory.Rpis} />
      <div className={classes.clearfix} />
    </div>
  )
}

export default withStyles(styles)(FactoryPage);
