import React from 'react';
import { withStyles } from '@material-ui/core';
import FactoryPage from './FactoryPage';
import service from '../../service';

const styles = {};

class FactoryContainer extends React.Component {
  state = {
    factory: {
      id: 1,
    },
  };

  componentDidMount() {
    console.log(this.props.match)
    this.fetchFactory(this.props.match.params.id)
  }

  async fetchFactory(factoryId) {
    try {
      const response = await service.get(`/factory/${factoryId}`);
      const factory = response.data;
      this.setState({ factory });
      console.log(factory)
    } catch (ex) {
      console.error(ex);
    }
  }

  render() {
    const { classes } = this.props;
    const { factory } = this.state;

    return <FactoryPage factory={factory} />;
  }
};

export default withStyles(styles)(FactoryContainer);
