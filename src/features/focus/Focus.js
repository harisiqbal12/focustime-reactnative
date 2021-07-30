import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { spacing, fontSizes } from '../../utils/sizes';

export const Focus = ({ addSubject }) => {
  const [input, setInput] = useState('');

  const clearInput = () => {
    setInput('')
    addSubject(input)
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}> What Would you like to focus on? </Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setInput}
            value={input}
            style={styles.inputField}
          />
          <RoundedButton
            addSubject={addSubject}
            currentInput={input}
            setInput={setInput}
            size={50}
            title="+"
            onPress={clearInput}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
    color: 'white',
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    backgroundColor: '#fff',
    flex: 1,
    marginRight: spacing.md,
  },
});
