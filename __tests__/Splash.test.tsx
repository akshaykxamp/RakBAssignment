import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { disableScreenshot, enableScreenshot } from 'screenshot-control-by-akshay';
import Splash from '../src/screens/Splash';
import { fetchDeviceInfo } from '../src/utils/DeviceInfo';
import { updateData } from '../src/services/Services';
import { Alert } from 'react-native';
import { Constants } from '../src/constants/Constants';
import { ErrorMessages } from '../src/constants/Error';

jest.mock('screenshot-control-by-akshay', () => ({
  enableScreenshot: jest.fn(),
  disableScreenshot: jest.fn(),
}));

jest.mock('../utils/DeviceInfo', () => ({
  fetchDeviceInfo: jest.fn(),
}));

jest.mock('../services/Services', () => ({
  updateData: jest.fn(),
}));

describe('Splash Component', () => {
  it('renders the component correctly', () => {
    const { getByTestId } = render(<Splash />);
    const logo = getByTestId('logo');
    const button = getByTestId('activate-button');
    expect(logo).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('displays the logo image', () => {
    const { getByTestId } = render(<Splash />);
    const logo = getByTestId('logo');
    expect(logo.props.source).toEqual(require('../assets/RBLogo.png'));
  });

  it('toggles button status on press', () => {
    const { getByTestId } = render(<Splash />);
    const button = getByTestId('activate-button');

    fireEvent.press(button);
    expect(button.props.isActivate).toBe(true);

    fireEvent.press(button);
    expect(button.props.isActivate).toBe(false);
  });

  it('calls enableScreenshot when button is pressed and status is true', async () => {
    const { getByTestId } = render(<Splash />);
    const button = getByTestId('activate-button');

    fireEvent.press(button);

    await waitFor(() => {
      expect(enableScreenshot).toHaveBeenCalled();
    });
  });

  it('calls disableScreenshot when button is pressed and status is false', async () => {
    const { getByTestId } = render(<Splash />);
    const button = getByTestId('activate-button');

    fireEvent.press(button);
    fireEvent.press(button);

    await waitFor(() => {
      expect(disableScreenshot).toHaveBeenCalled();
    });
  });

  it('shows ActivityIndicator when loading', async () => {
    const { getByTestId } = render(<Splash />);
    const button = getByTestId('activate-button');
    fireEvent.press(button);

    const loader = getByTestId('activity-indicator');
    expect(loader).toBeTruthy();
  });

  it('calls getDeviceInfo and updateData when button is pressed', async () => {
    const { getByTestId } = render(<Splash />);
    const button = getByTestId('activate-button');
    
    fetchDeviceInfo.mockResolvedValueOnce({ deviceName: 'Test Device' });
    updateData.mockResolvedValueOnce(true);

    fireEvent.press(button);

    await waitFor(() => {
      expect(fetchDeviceInfo).toHaveBeenCalled();
      expect(updateData).toHaveBeenCalledWith(Constants.TemporaryUrl, { deviceName: 'Test Device' });
    });
  });

  it('handles errors in enabling screenshots', async () => {
    enableScreenshot.mockImplementationOnce(() => {
      throw new Error('Error enabling screenshots');
    });

    const { getByTestId } = render(<Splash />);
    const button = getByTestId('activate-button');
    
    fireEvent.press(button);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(ErrorMessages.ErrorEnablingScreenshots);
    });
  });

  it('handles errors in disabling screenshots', async () => {
    disableScreenshot.mockImplementationOnce(() => {
      throw new Error('Error disabling screenshots');
    });

    const { getByTestId } = render(<Splash />);
    const button = getByTestId('activate-button');

    fireEvent.press(button);
    fireEvent.press(button);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(ErrorMessages.ErrorDisablingScreenshots);
    });
  });
});
