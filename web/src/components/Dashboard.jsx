import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Typography, withStyles } from '@material-ui/core';
import FactoryCard from './Factory/FactoryCard';
import service from '../service';

const styles = () => ({
  link: {
    textDecoration: 'none',
  },
});

const Title = ({ count = 0 }) => (
  <div>
    <Typography variant="h5" gutterBottom>
      รายชื่อโรงงานภายในระบบ
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      พบทั้งหมด {count} โรงงาน
    </Typography>
  </div>
);

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      factoryList: [],
    }
  }

  componentDidMount() {
    this.fetchFactory();
  }

  async fetchFactory() {
    try {
      const response = await service.get('/factory')
      const factoryList = response.data || []
      this.setState({ factoryList })
      console.log(factoryList)
    }
    catch(ex) {
      console.error(ex)
    }
  }

  render() {
    const { classes } = this.props;
    const { factoryList } = this.state;
    const factoryListItems = factoryList.map(factory => (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link to={`/factory/${factory.id}`} className={classes.link} key={factory.id}>
        <FactoryCard factory={factory} />
      </Link>
    ));

    return (
      <div>
        <Title count={factoryList.length} />
        {factoryListItems}
      </div>
    );
  }
}
Dashboard.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Dashboard);