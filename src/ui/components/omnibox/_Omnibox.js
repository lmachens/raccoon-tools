import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { TextField } from '../generic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { unfocusOmnibox } from '../../../store/actions';

class Omnibox extends PureComponent {
  state = {
    command: ''
  };

  componentDidUpdate(prevProps) {
    const { focus } = this.props;
    if (!prevProps.focus && focus) {
      this.textField.focus();
    } else if (prevProps.focus && !focus) {
      this.textField.blur();
    }
  }

  handleChange = event => {
    this.setState({
      command: event.target.value
    });
  };

  handleBlur = () => {
    const { focus, unfocusOmnibox } = this.props;
    this.setState({ command: '' }, () => {
      if (focus) unfocusOmnibox();
    });
  };

  render() {
    const { commandHint = '' } = this.props;
    const { command } = this.state;

    return (
      <TextField
        fullWidth
        helperText="Press / to run a command"
        InputProps={{
          onBlur: this.handleBlur
        }}
        inputRef={element => (this.textField = element)}
        onChange={this.handleChange}
        placeholder={commandHint}
        value={command}
      />
    );
  }
}

Omnibox.propTypes = {
  commandHint: PropTypes.string,
  focus: PropTypes.bool.isRequired,
  unfocusOmnibox: PropTypes.func.isRequired
};

const mapStateToProps = ({ omnibox: { focus }, navigation: { cursor, items, selectedItem } }) => {
  const item = get(items, cursor) || selectedItem || {};
  return {
    commandHint: item.commandHint,
    focus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    unfocusOmnibox: bindActionCreators(unfocusOmnibox, dispatch)
  };
};

const enhance = connect(
  mapStateToProps,
  mapDispatchToProps
)(Omnibox);

export { enhance as Omnibox };
