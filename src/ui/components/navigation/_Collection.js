import { registerItems, unregisterItems } from '../../../store/actions';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Collection extends PureComponent {
  componentDidMount() {
    const { registerItems, items } = this.props;
    registerItems({ items });
  }

  componentWillUnmount() {
    const { unregisterItems, items } = this.props;
    unregisterItems({ items });
  }

  render() {
    return null;
  }
}

Collection.propTypes = {
  registerItems: PropTypes.func.isRequired,
  unregisterItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    registerItems: bindActionCreators(registerItems, dispatch),
    unregisterItems: bindActionCreators(unregisterItems, dispatch)
  };
};

const enhance = connect(
  null,
  mapDispatchToProps
)(Collection);

export { enhance as Collection };
