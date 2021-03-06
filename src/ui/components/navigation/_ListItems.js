import { List, ListItem, ListItemText, Typography } from '../generic';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import toPath from 'lodash/toPath';

class ListItems extends PureComponent {
  render() {
    const { cursor, items, prevCursor } = this.props;
    const path = toPath(cursor);
    const isNested = path.length > 2;
    return (
      <List dense>
        {Object.entries(items).map(([key, value]) => {
          const combinedKey = prevCursor ? `${prevCursor}.${key}` : key;
          const selected = cursor === combinedKey;
          return (
            <ListItem button dense key={combinedKey}>
              {isNested && <Typography>{'<='}</Typography>}
              <ListItemText
                primary={
                  <Typography style={{ textDecoration: selected ? 'underline' : null }}>
                    {value.title || combinedKey}
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
