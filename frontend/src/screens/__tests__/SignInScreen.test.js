
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignInScreen from '../SignInScreen'; 

jest.mock('@hooks/useAuth', () => ({
  useAuthContext: () => ({
    signIn: jest.fn(), 
  }),
}));

describe('SignInScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<SignInScreen />);
    expect(getByText('Welcome to MindfulTech')).toBeTruthy();
  });

  it('calls signIn on button press', () => {
    const { getByText } = render(<SignInScreen />);
    fireEvent.press(getByText('Sign In'));
    
  });
});
