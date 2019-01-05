import React from 'react';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import FactoryPage from './FactoryPage';
import service from '../../service';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class FactoryContainer extends React.Component {
  state = {}

  componentDidMount() {
    this.fetchFactory(this.props.match.params.id)
  }

  async fetchFactory(factoryId) {
    try {
      this.loading();
      const response = await service.get(`/factory/${factoryId}`);
      const factory = response.data;
      this.setState({ factory });
      this.done();
      console.log(factory)
    } catch (ex) {
      console.error(ex);
    }
  }

  loading = () => this.setState({ loading: true })
  done = () => this.setState({ loading: false })

  render() {
    const { classes } = this.props;
    const { factory, loading = true } = this.state;

    if (loading) {
      return <div>
        <CircularProgress className={classes.progress} />
      </div>;
    }

    return <FactoryPage factory={factory} />;
  }
};

export default withStyles(styles)(FactoryContainer);
