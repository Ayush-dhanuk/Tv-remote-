import AsyncStorage from '@react-native-async-storage/async-storage';
import { TVCommand } from '../types/tv';

const IP_STORAGE_KEY = '@tv_remote_ip';
const PORT_STORAGE_KEY = '@tv_remote_port';

export const getStoredConfig = async (): Promise<{ ip: string; port: string }> => {
  try {
    const ip = await AsyncStorage.getItem(IP_STORAGE_KEY);
    const port = await AsyncStorage.getItem(PORT_STORAGE_KEY);
    return { ip: ip || '192.168.1.50', port: port || '8001' };
  } catch (error) {
    console.error('Failed to load TV config', error);
    return { ip: '192.168.1.50', port: '8001' };
  }
};

export const saveStoredConfig = async (ip: string, port: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(IP_STORAGE_KEY, ip);
    await AsyncStorage.setItem(PORT_STORAGE_KEY, port);
  } catch (error) {
    console.error('Failed to save TV config', error);
  }
};

export const sendTVCommand = async (command: TVCommand): Promise<boolean> => {
  try {
    const { ip, port } = await getStoredConfig();
    if (!ip) throw new Error('No IP address configured');

    const url = `http://${ip}:${port}/command`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command }),
    });

    return response.ok;
  } catch (error) {
    console.error(`Error sending command ${command}:`, error);
    return false;
  }
};
    
