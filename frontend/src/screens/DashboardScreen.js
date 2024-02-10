import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>Welcome to MindfulTech</Card.Title>
        <Card.Divider />
        <Text style={styles.cardContent}>
          Your digital wellbeing is our priority. Track and manage your social media usage with ease.
        </Text>
        <Button
          buttonStyle={styles.button}
          title="View Stats"
          onPress={() => {}}
        />
        <Button
          buttonStyle={styles.button}
          title="Settings"
          onPress={() => {}}
          containerStyle={styles.buttonContainer}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cardContent: {
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%', 
    marginTop: 15,
  },
});

export default DashboardScreen;
