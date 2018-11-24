import React from 'react';
import { withStyles } from '@material-ui/core';
import FactoryPage from './FactoryPage';

const styles = {};

class FactoryContainer extends React.Component {
  state = {
    factory: {
      id: 1,
    },
  }

  render() {
    const { classes } = this.props;
    const { factory } = this.state.factory;

    return (
      <FactoryPage factory={factory} />
    );
  }
};

export default withStyles(styles)(FactoryContainer);
