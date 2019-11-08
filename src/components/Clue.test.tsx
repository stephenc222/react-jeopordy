import React from 'react';
import ReactDOM from 'react-dom';
import Clue from './Clue';

describe('Clue', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Clue />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
