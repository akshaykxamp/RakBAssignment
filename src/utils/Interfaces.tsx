export interface DeviceInfo {
    deviceName: string;
    imei: string;
    location: {
      latitude: string;
      longitude: string;
    };
    macAddress: string;
    os: string;
  }
