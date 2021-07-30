import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { spacing, fontSizes } from '../utils/sizes';

const minutesToMilis = (min) => min * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const [milis, setMilis] = useState(null);

  const interval = React.useRef(null);

  const coundtown = () => {
    setMilis((time) => {
      if (time > 0) {
        const timeLeft = time - 1000;
        onProgress(timeLeft / minutesToMilis(minutes));
        return timeLeft;
      }

      clearInterval(interval.current);
      onEnd();
      return time;
    });
  };

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

      interval.current = setInterval(coundtown, 1000)
      return () => clearInterval(interval.current);
    
  }, [isPaused]);

  useEffect(() => {
    setMilis(minutesToMilis(minutes));
  }, [minutes]);

  const minute = Math.floor(milis / 1000 / 60) % 60;
  const seconds = Math.floor(milis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: '#fff',
    padding: spacing.lg,
    backgroundColor: 'rgba(235,170,152, 0.4)',
  },
});
