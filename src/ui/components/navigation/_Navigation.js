import React, { PureComponent } from 'react';

import { ListItems } from './_ListItems';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import toPath from 'lodash/toPath';
import { Typography } from '../generic';

class Navigation extends PureComponent {
  render() {
    const { cursor, items, selectedItem } = this.props;

    if (selectedItem) return null;

    const path = toPath(cursor);
    const prevPath = path.slice(0, path.length - 1);
    const prevCursor =
      prevPath.length > 0 ? prevPath.reduce((curr, next) => `${curr}.${next}`) : null;
    const currentItems = prevPath.length ? get(items, prevPath) : items;
    return (
      <>
        <Typography>User ↑ ↓ → ← to navigate and ↵ to select</Typography>
        <ListItems cursor={cursor} items={currentItems || {}} prevCursor={prevCursor} />
      </>
    );
  }
}

Navigation.propTypes = {
  cursor: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  selectedItem: PropTypes.object
};

const mapStateToProps = ({ navigation: { cursor, items, selectedItem } }) => {
  return {
    cursor,
    items,
    selectedItem
  };
};

const enhance = connect(mapStateToProps)(Navigation);

export { enhance as Navigation };
