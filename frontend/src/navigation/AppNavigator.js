import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DashboardScreen from '../screens/DashboardScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { ROUTES } from './routes';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName={ROUTES.DASHBOARD}>
    <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
    <Stack.Screen name={ROUTES.STATS} component={StatsScreen} />
    <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
