import { List, ListItem, ListItemText, Typography } from '../components/generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  active: {
    fontWeight: 'bold'
  }
};

class HomePage extends PureComponent {
  state = {
    cursor: 0,
    result: [0, 1, 2]
  };
  handleKeyDown = e => {
    const { cursor, result } = this.state;
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1
      }));
    } else if (e.keyCode === 40 && cursor < result.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1
      }));
    }
  };

  render() {
    const { cursor } = this.state;

    return (
      <List onKeyDown={this.handleKeyDown}>
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
  classes: PropTypes.object.isRequired
};

const enhance = withStyles(styles)(HomePage);

export { enhance as HomePage };
