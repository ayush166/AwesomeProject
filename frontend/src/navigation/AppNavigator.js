import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '@screens/DashboardScreen';
import SignInScreen from '@screens/SignInScreen';
import SplashScreen from '@screens/SplashScreen';
import { useAuthContext } from '@hooks/useAuth';
import SettingsScreen from '@screens/SettingsScreen';
import StatsScreen from '@screens/StatsScreen';
import { ROUTES } from './routes';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { authTokens, isLoading } = useAuthContext();

  //screens based on auth state
  let screens;

  if (isLoading) {
    // loading indicator
    screens = <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} options={{ headerShown: false }} />;
  } else if (authTokens) {
    // User is signed in, show app screens
    screens = (
      <>
        <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
        <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
        <Stack.Screen name={ROUTES.STATS} component={StatsScreen} />
      </>
    );
  } else {
    // User is not signed in, show sign in screen
    screens = <Stack.Screen name={ROUTES.SIGNIN} component={SignInScreen} options={{ headerShown: false }} />;
  }

  return (
    <Stack.Navigator>
      {screens}
    </Stack.Navigator>
  );
};

export default AppNavigator;
