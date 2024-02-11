// screens/SplashScreen.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
//import { useAuthContext } from '../hooks/useAuth';


const SplashScreen = () => {


  

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
