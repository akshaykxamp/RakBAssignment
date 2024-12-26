import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App Component', () => {
  it('renders the SafeAreaView with the correct style and testID', () => {
    const { getByTestId } = render(<App />);
    const safeAreaView = getByTestId('safe-area-view');
    expect(safeAreaView).toBeTruthy();
    expect(safeAreaView.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: '#FFFFFF',
        flex: 1,
      })
    );
  });

  it('renders the Splash component inside the SafeAreaView', () => {
    const { getByTestId } = render(<App />);
    const splashComponent = getByTestId('splash-screen');
        expect(splashComponent).toBeTruthy();
  });
});
