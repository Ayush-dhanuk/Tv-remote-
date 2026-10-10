import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dpad } from './components/Dpad';
import { IpInput } from './components/IpInput';
import { sendTVCommand } from './services/tvController';
import { TVCommand } from './types/tv';

export default function App() {
  const [feedback, setFeedback] = useState<string>('Ready');

  const handleCommand = async (cmd: TVCommand) => {
    setFeedback(`Sending ${cmd}...`);
    const success = await sendTVCommand(cmd);
    if (success) {
      setFeedback(`Sent: ${cmd}`);
    } else {
      setFeedback(`Failed: ${cmd} (Check connection)`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0e17" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Smart TV Remote</Text>
          <Text style={styles.statusText}>{feedback}</Text>
        </View>

        <IpInput onConfigSaved={() => setFeedback('Connection settings updated')} />

        <View style={styles.row}>
          <TouchableOpacity style={[styles.actionButton, styles.powerButton]} onPress={() => handleCommand('POWER')}>
            <Ionicons name="power" size={20} color="#ff5252" />
            <Text style={styles.powerText}>Power</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleCommand('MUTE')}>
            <Ionicons name="volume-mute" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleCommand('HOME')}>
            <Ionicons name="home" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleCommand('BACK')}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.dpadContainer}>
          <Dpad onCommand={handleCommand} />
        </View>

        <View style={styles.controlsRow}>
          <View style={styles.controlGroup}>
            <Text style={styles.groupLabel}>VOLUME</Text>
            <TouchableOpacity style={styles.ctrlButton} onPress={() => handleCommand('VOL_UP')}>
              <Ionicons name="add" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlButton} onPress={() => handleCommand('VOL_DOWN')}>
              <Ionicons name="remove" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.controlGroup}>
            <Text style={styles.groupLabel}>CHANNEL</Text>
            <TouchableOpacity style={styles.ctrlButton} onPress={() => handleCommand('CH_UP')}>
              <Ionicons name="chevron-up" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ctrlButton} onPress={() => handleCommand('CH_DOWN')}>
              <Ionicons name="chevron-down" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mediaRow}>
          <TouchableOpacity style={styles.mediaButton} onPress={() => handleCommand('PLAY')}>
            <Ionicons name="play" size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaButton} onPress={() => handleCommand('PAUSE')}>
            <Ionicons name="pause" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0e17',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fffffe',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#a7a9be',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    height: 44,
    backgroundColor: '#16161a',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    flexDirection: 'row',
  },
  powerButton: {
    backgroundColor: '#2a1a20',
  },
  powerText: {
    color: '#ff5252',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
  dpadContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  controlGroup: {
    flex: 1,
    backgroundColor: '#16161a',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  groupLabel: {
    color: '#a7a9be',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ctrlButton: {
    width: '100%',
    height: 38,
    backgroundColor: '#24242c',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  mediaRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 16,
  },
  mediaButton: {
    width: 60,
    height: 40,
    backgroundColor: '#16161a',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
});
      
