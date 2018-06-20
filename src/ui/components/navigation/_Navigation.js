import React, { PureComponent } from 'react';

import { ListItems } from './_ListItems';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';
import toPath from 'lodash/toPath';

class Navigation extends PureComponent {
  render() {
    const { cursor, items } = this.props;

    const path = toPath(cursor);
    const prevPath = path.slice(0, path.length - 1);
    const prevCursor = prevPath.length && prevPath.reduce((curr, next) => `${curr}.${next}`);
    const currentItems = prevPath.length ? get(items, prevPath) : items;
    return <ListItems cursor={cursor} items={currentItems || {}} prevCursor={prevCursor} />;
  }
}

Navigation.propTypes = {
  cursor: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired
};

const mapStateToProps = ({ navigation: { cursor, items } }) => {
  return {
    cursor,
    items
  };
};

const enhance = connect(mapStateToProps)(Navigation);

export { enhance as Navigation };
