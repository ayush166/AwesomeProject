// SignInScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignInScreen from '@screens/SignInScreen';

describe('SignInScreen', () => {
  it('calls signIn when the sign-in button is pressed', () => {
    const mockSignIn = jest.fn();
    const { getByText } = render(<SignInScreen signIn={mockSignIn} />);

    fireEvent.press(getByText('Sign In'));
    expect(mockSignIn).toHaveBeenCalled();
  });
});
