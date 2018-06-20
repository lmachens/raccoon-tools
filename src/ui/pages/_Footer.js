import { registerItems, unregisterItems } from '../../store/actions';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const items = {
  help: {}
};

class Footer extends PureComponent {
  componentDidMount() {
    const { registerItems } = this.props;
    registerItems({ items });
  }

  componentWillUnmount() {
    const { unregisterItems } = this.props;
    unregisterItems({ items });
  }

  render() {
    return null;
  }
}

Footer.propTypes = {
  registerItems: PropTypes.func.isRequired,
  unregisterItems: PropTypes.func.isRequired
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
)(Footer);

export { enhance as Footer };
