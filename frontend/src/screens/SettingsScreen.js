import { useMutation } from 'convex/react';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Input, Switch, Button } from 'react-native-elements';
import { api } from '../../convex/_generated/api';
import { upsertEmail } from '../../convex/todos';


// src/screens/SettingsScreen.js
const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [dailyLimit, setDailyLimit] = useState('');
  const [email, setEmail] = useState('');
const handleSubmit=()=>{
    upsertEmail({text:email})
}
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const upsertEmail=useMutation(api.todos.upsertEmail)
  return (
    <View style={styles.container}>
        <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
          <Button onPress={handleSubmit} title="Save" />
        </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default SettingsScreen;
