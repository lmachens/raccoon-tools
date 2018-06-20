import { List, ListItem, ListItemText, Typography } from '../components/generic';
import React, { PureComponent } from 'react';
import { registerItems, unregisterItems } from '../../store/actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import get from 'lodash/get';
import toPath from 'lodash/toPath';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  active: {
    fontWeight: 'bold'
  }
};

const page = 'general';
const items = {
  item1: {},
  item2: {},
  item3: {
    nested: {
      item4: {},
      item5: {}
    }
  }
};

const allItems = {
  general: { ...items }
};

class ListItems extends PureComponent {
  render() {
    const { cursor, items, page } = this.props;
    const path = toPath(cursor);
    return (
      <List>
        {Object.entries(items).map(([key, value]) => {
          const combinedKey = `${page}.${key}`;
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
  page: PropTypes.string.isRequired
};

class General extends PureComponent {
  componentDidMount() {
    const { registerItems } = this.props;
    registerItems({ items, page });
  }

  componentWillUnmount() {
    const { unregisterItems } = this.props;
    unregisterItems({ page });
  }

  render() {
    const { cursor } = this.props;
    const path = toPath(cursor);
    const prevPath = path.slice(0, path.length - 1);
    const prevCursor = prevPath.reduce((curr, next) => `${curr}.${next}`);

    return <ListItems cursor={cursor} items={get(allItems, prevPath)} page={prevCursor} />;
  }
}

General.propTypes = {
  classes: PropTypes.object.isRequired,
  cursor: PropTypes.string.isRequired,
  registerItems: PropTypes.func.isRequired,
  unregisterItems: PropTypes.func.isRequired
};

const mapStateToProps = ({ navigation: { cursor } }) => {
  return {
    cursor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerItems: bindActionCreators(registerItems, dispatch),
    unregisterItems: bindActionCreators(unregisterItems, dispatch)
  };
};

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(General);

export { enhance as General };
