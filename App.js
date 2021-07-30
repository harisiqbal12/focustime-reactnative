import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Platform } from 'react-native';

import { spacing } from './src/utils/sizes';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/focusHistory';
import { RoundedButton } from './src/components/RoundedButton';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  console.log(focusHistory);

  const onClear = () => {
    // Things to do
  };

  clearHistory = () => {
    setFocusHistory([]);
  }


  const cancelTimer = () => {
    addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
    setFocusSubject(null);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          cancelTimer={cancelTimer}
          focusSubject={focusSubject}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
          <View style={styles.clearBtn}>
            <RoundedButton size={50} title='clear' onPress={clearHistory} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e07a5f',
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
  clearBtn: {
    flex: 0.2,
    alignItems: 'center'
  }

});
