import React from 'react';
import { render } from '@testing-library/react';

import App from './components/App/App';
import Mentor from './components/Mentor/Mentor';
import MentorAssessment from './components/MentorRedirect/MentorAssessment';
import MentorTeams from './components/MentorRedirect/MentorTeams';
import MentorQuiz from './components/MentorRedirect/MentorQuiz';
import { BrowserRouter } from 'react-router-dom';

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
    render(<BrowserRouter><App /></BrowserRouter>);
  });
});

describe('Testing Mentor', () => {
  test('renders Mentor component', () => {
    render(<BrowserRouter><Mentor /></BrowserRouter>);
  });
});

describe('Testing MentorTeams', () => {
  test('renders Mentor component', () => {
    render(<BrowserRouter><MentorTeams /></BrowserRouter>);
  });
});

describe('Testing Mentor', () => {
  test('renders Mentor component', () => {
    render(<BrowserRouter><MentorAssessment /></BrowserRouter>);
  });
});

describe('Testing Mentor', () => {
  test('renders Mentor component', () => {
    render(<BrowserRouter><MentorQuiz /></BrowserRouter>);
  });
});


//Test documentation gained from https://www.robinwieruch.de/react-testing-library/