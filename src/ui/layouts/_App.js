import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { Typography } from '../components/generic';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { dragMove } from '../../api/windows';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      // Change from `box-sizing: content-box` so that `width`
      // is not affected by `padding` or `border`.
      boxSizing: 'border-box'
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    body: {
      margin: 0,
      backgroundColor: '#2525255c'
    }
  },
  header: {}
};

class AppLayout extends PureComponent {
  render() {
    const { classes, children, version } = this.props;

    return (
      <>
        <header className={classes.header} onMouseDown={dragMove}>
          <Typography>Raccoon Tools v{version}</Typography>
        </header>
        {children}
      </>
    );
  }
}

AppLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  version: PropTypes.string.isRequired
};

const mapStateToProps = ({ utilities: { version } }) => {
  return {
    version
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(AppLayout);
export { enhance as AppLayout };
