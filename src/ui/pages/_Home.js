import { List, ListItem, ListItemText, Typography } from '../components/generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  active: {
    fontWeight: 'bold'
  }
};

class HomePage extends PureComponent {
  render() {
    const { cursor } = this.props;

    return (
      <List>
        <ListItem button dense>
          <ListItemText inset={cursor === 0} primary="Trash" />
        </ListItem>
        <ListItem button dense>
          <ListItemText inset={cursor === 1} primary="Trash2" />
        </ListItem>
        <ListItem button dense>
          <ListItemText inset={cursor === 2} primary="Trash3" />
        </ListItem>
        <Typography>Home</Typography>
      </List>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  cursor: PropTypes.number.isRequired
};

const mapStateToProps = ({ navigation: { cursor } }) => {
  return {
    cursor
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
)(HomePage);

export { enhance as HomePage };
