import { DeviceInfo } from "../utils/Interfaces";


export const updateData = async (url:string, data:DeviceInfo) => {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) throw new Error(`Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  };
  
