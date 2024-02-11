import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuthContext } from '../hooks/useAuth';


const DashboardScreen = () => {
  const { userInfo, logout } = useAuthContext();


    console.log('User info:', userInfo);
  
  if (!userInfo) {
    return (
      <View>
        <Text>Loading user information...</Text>
        {/* activity indicator  */}
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome, {userInfo.name || 'User'}!</Text>
      <Button title="Sign Out" onPress={logout} />
    </View>
  );
};

export default DashboardScreen;
