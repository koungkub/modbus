import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import FactoryPage from './FactoryPage';
import { getFactory } from '../../redux/factory/action'

class FactoryContainer extends React.Component {
  state = {}

  componentDidMount() {
    this.props.getFactory(this.props.match.params.id);
  }

  loading = () => this.setState({ loading: true })
  done = () => this.setState({ loading: false })

  render() {
    const { factory, isFetching = true } = this.props;

    if (isFetching) {
      return <CircularProgress />;
    }

    return <FactoryPage factory={factory} />;
  }
};

const mapStateToProps = state => ({
  factory: state.factory.data,
  isFetching: state.factory.isFetching,
})

const mapDispatchToProps = dispatch => ({
  getFactory: factoryId => dispatch(getFactory(factoryId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FactoryContainer);
