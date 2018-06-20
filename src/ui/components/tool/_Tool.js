import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { unselectItem } from '../../../store/actions';
import { Typography } from '../generic';

class Tool extends PureComponent {
  render() {
    const { selectedItem } = this.props;

    if (!selectedItem) return null;

    const { component: Component } = selectedItem;

    return (
      <>
        <Typography>Press Esc to escape</Typography>
        <Component />
      </>
    );
  }
}

Tool.propTypes = {
  selectedItem: PropTypes.object,
  unselectItem: PropTypes.func.isRequired
};

const mapStateToProps = ({ navigation: { selectedItem } }) => {
  return {
    selectedItem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unselectItem: bindActionCreators(unselectItem, dispatch)
  };
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tool);

export { enhance as Tool };
