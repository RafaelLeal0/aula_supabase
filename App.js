import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/userContext';

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}
