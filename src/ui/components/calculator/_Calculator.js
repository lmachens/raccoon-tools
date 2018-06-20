import React, { PureComponent } from 'react';

import { Typography, TextField } from '../generic';
import Calc from 'expression-calculator/exprcalc';

class Calculator extends PureComponent {
  state = {
    input: '',
    result: '',
    history: []
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.setState(state => ({
        history: [state.result, ...state.history.slice(0, 10)],
        input: '',
        result: ''
      }));
    }
  };

  handleChange = event => {
    const { value: input } = event.target;

    let result = '';
    try {
      const calc = new Calc();
      result = input.length ? calc.compile(input).calc() : '';
    } catch (e) {
      e;
    }

    this.setState({
      input,
      result
    });
  };

  render() {
    const { history, result, input } = this.state;
    return (
      <>
        <Typography>Calculator</Typography>
        <TextField
          autoFocus={true}
          label=""
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={input}
        />
        <Typography>= {result || 'unknown'}</Typography>
        {history.map((value, index) => (
          <div key={index}>
            <Typography>{value}</Typography>
          </div>
        ))}
      </>
    );
  }
}

export { Calculator };
