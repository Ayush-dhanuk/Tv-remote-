import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TVCommand } from '../types/tv';
import { Ionicons } from '@expo/vector-icons';

interface DpadProps {
  onCommand: (command: TVCommand) => void;
}

export const Dpad: React.FC<DpadProps> = ({ onCommand }) => {
  return (
    <View style={styles.container}>
      {/* Up */}
      <TouchableOpacity
        style={[styles.button, styles.upButton]}
        onPress={() => onCommand('UP')}
        activeOpacity={0.6}
      >
        <Ionicons name="chevron-up" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.middleRow}>
        {/* Left */}
        <TouchableOpacity
          style={[styles.button, styles.leftButton]}
          onPress={() => onCommand('LEFT')}
          activeOpacity={0.6}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>

        {/* OK / Enter */}
        <TouchableOpacity
          style={styles.okButton}
          onPress={() => onCommand('ENTER')}
          activeOpacity={0.6}
        >
          <Text style={styles.okText}>OK</Text>
        </TouchableOpacity>

        {/* Right */}
        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={() => onCommand('RIGHT')}
          activeOpacity={0.6}
        >
          <Ionicons name="chevron-forward" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Down */}
      <TouchableOpacity
        style={[styles.button, styles.downButton]}
        onPress={() => onCommand('DOWN')}
        activeOpacity={0.6}
      >
        <Ionicons name="chevron-down" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16161a',
    borderRadius: 110,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#24242c',
  },
  upButton: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 5,
  },
  downButton: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginTop: 5,
  },
  leftButton: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginRight: 5,
  },
  rightButton: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginLeft: 5,
  },
  okButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#7f5af0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7f5af0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  okText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
        
