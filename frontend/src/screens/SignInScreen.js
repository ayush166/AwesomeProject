import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { useAuthContext } from '@hooks/useAuth';



const SignInScreen = ({ navigation }) => {
  const { signIn } = useAuthContext();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MindfulTech</Text>
      <Button title="Sign In" onPress={signIn} />
      {/* Sign Up logic or navigation */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SignInScreen;
