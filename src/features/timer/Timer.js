import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Vibration,
  Platform,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, cancelTimer, onTimerEnd }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const togglestart = () => setIsStarted(!isStarted);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 100);
      setTimeout(() => clearInterval(interval), 10000);
      return;
    }

    Vibration.vibrate(10000);
  };

  const onEnd = () => {
    vibrate();

    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
  };
  return (
    <View style={styles.container}>
      <View style={{ margin: 75 }}>
        <ProgressBar
          color="rgba(235,170,152, 0.6)"
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.countDown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={styles.btnWrapper}>
        <Timing changeTime={changeTime} />
      </View>

      <View style={styles.btnWrapper}>
        <RoundedButton
          title={`${isStarted ? 'pause' : 'start'}`}
          size={100}
          onPress={togglestart}
        />
      </View>
      <View style={styles.cancelBtn}>
        <RoundedButton onPress={cancelTimer} title="-" size={50} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  task: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flex: 0.3,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtn: {
    padding: spacing.sm,
  },
});
