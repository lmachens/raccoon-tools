import { List, ListItem, ListItemText, Typography } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import toPath from 'lodash/toPath';

class ListItems extends PureComponent {
  render() {
    const { cursor, items, prevCursor } = this.props;
    const path = toPath(cursor);
    return (
      <List>
        {Object.entries(items).map(([key, value]) => {
          const combinedKey = prevCursor ? `${prevCursor}.${key}` : key;
          const selected = cursor === combinedKey;
          return (
            <ListItem button dense key={combinedKey}>
              {path.length > 2 && <Typography>{'<='}</Typography>}
              <ListItemText
                primary={
                  <Typography style={{ textDecoration: selected ? 'underline' : null }}>
                    {combinedKey}
                  </Typography>
                }
              />
              {value.nested && <Typography>{'=>'}</Typography>}
            </ListItem>
          );
        })}
      </List>
    );
  }
}

ListItems.propTypes = {
  cursor: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  prevCursor: PropTypes.string
};

export { ListItems };
