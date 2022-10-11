import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

describe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});

describe('Testing App.js', () => {
  test('renders App component', () => {
    render(<App />);
  });
});

//Test documentation gained from https://www.robinwieruch.de/react-testing-library/