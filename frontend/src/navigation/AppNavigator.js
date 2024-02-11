import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import SignInScreen from '../screens/SignInScreen';
import { useAuthContext } from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { authTokens } = useAuthContext();

  return (
    <Stack.Navigator>
      {authTokens ? (
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      ) : (
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
