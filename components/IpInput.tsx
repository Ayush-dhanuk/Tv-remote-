import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getStoredConfig, saveStoredConfig } from '../services/tvController';

interface IpInputProps {
  onConfigSaved: () => void;
}

export const IpInput: React.FC<IpInputProps> = ({ onConfigSaved }) => {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('8001');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    getStoredConfig().then((config) => {
      setIp(config.ip);
      setPort(config.port);
    });
  }, []);

  const handleSave = async () => {
    await saveStoredConfig(ip, port);
    setIsSaved(true);
    onConfigSaved();
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.ipInput]}
          placeholder="TV IP (e.g. 192.168.1.50)"
          placeholderTextColor="#666"
          value={ip}
          onChangeText={setIp}
          keyboardType="numeric"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, styles.portInput]}
          placeholder="Port"
          placeholderTextColor="#666"
          value={port}
          onChangeText={setPort}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{isSaved ? 'Saved!' : 'Save Connection'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: '#16161a',
    borderRadius: 12,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#24242c',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 14,
  },
  ipInput: {
    flex: 3,
    marginRight: 8,
  },
  portInput: {
    flex: 1,
  },
  button: {
    backgroundColor: '#7f5af0',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
    
