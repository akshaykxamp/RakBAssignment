import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RadioButton_ from '../src/components/RadioButton';

describe('RadioButton_ Component', () => {
  const mockOnPress = jest.fn();

  test('rendering with default props', () => {
    const {getByTestId} = render(<RadioButton_ />);
    const circle1 = getByTestId('arrow-circle-disable');
    const circle2 = getByTestId('arrow-circle-enable');
    expect(circle1.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: '#D3D3D3', height: 30}),
      ]),
    );
    expect(circle2.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: '#00FF00', height: 36}),
      ]),
    );
  });

  test('rendering when activated', () => {
    const {getByTestId} = render(
      <RadioButton_ isActivate={true} onPress={mockOnPress} />,
    );
    const circle1 = getByTestId('arrow-circle-disable');
    const circle2 = getByTestId('arrow-circle-enable');
    expect(circle1.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: '#A9A9A9', height: 36}),
      ]),
    );
    expect(circle2.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: '#D3D3D3', height: 30}),
      ]),
    );
  });

  test('rendering when deactivated', () => {
    const {getByTestId} = render(
      <RadioButton_ isActivate={false} onPress={mockOnPress} />,
    );
    const circle1 = getByTestId('arrow-circle-disable');
    const circle2 = getByTestId('arrow-circle-enable');
    expect(circle1.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: '#D3D3D3', height: 30}),
      ]),
    );
    expect(circle2.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({backgroundColor: '#00FF00', height: 36}),
      ]),
    );
  });

  test('calls onPress when pressed', () => {
    const {getByTestId} = render(<RadioButton_ onPress={mockOnPress} />);
    const pressable = getByTestId('arrow-circle');
    fireEvent.press(pressable);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
