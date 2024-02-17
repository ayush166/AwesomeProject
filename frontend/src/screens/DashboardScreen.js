import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuthContext } from '@hooks/useAuth';
import { useMutation, useQuery } from 'convex/react';
import {api} from "../../convex/_generated/api"
import { useNavigation } from '@react-navigation/native';


const DashboardScreen = () => {
  const { userInfo, logout } = useAuthContext();
  const navigation = useNavigation(); 
  const todos=useQuery(api.todos.getTodos)
  
   const email = todos && todos.length > 0 ? todos[0].text : null;
   const text=todos?  <Text>{email}</Text>:<Text>Loading...</Text>
    const openSettings = () => {
      navigation.navigate('SETTINGS'); // Use the route name that you have defined in your navigation stack
    };
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
    
    {text}
      <Button title="Sign Out" onPress={logout} />
      <Button title="Open Settings" onPress={openSettings} />
    </View>
  );
};

export default DashboardScreen;
