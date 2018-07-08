import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { Typography } from '../generic';
import { connect } from 'react-redux';

class GameInfo extends PureComponent {
  render() {
    const { title } = this.props;

    if (!title) return <Typography>No game found</Typography>;
    return (
      <>
        <Typography>{title}</Typography>
      </>
    );
  }
}

GameInfo.propTypes = {
  title: PropTypes.string
};

const mapStateToProps = ({ gameInfo }) => {
  return {
    ...gameInfo
  };
};

const enhance = connect(mapStateToProps)(GameInfo);

export { enhance as GameInfo };
