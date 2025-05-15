// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
// Remover import do Index
// import Index from '../screens/index';
// Remover import do RouteScreen
// import RouteScreen from '../screens/Route';
import Perfil from '../screens/Perfil';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UploadsScreen from '../screens/UploadsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Perfil"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          // Remover referência ao Index
          // if (route.name === 'Index') iconName = 'map-pin';
          if (route.name === 'Perfil') iconName = 'user';
          else if (route.name === 'Uploads') iconName = 'upload';
          return <Feather name={iconName} size={28} color="white" style={{ marginBottom: -10 }} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'black',
          height: 80,
          paddingHorizontal: 50,
        },
      })}
    >
      {/* Remover Tab.Screen Index */}
      {/* <Tab.Screen name="Index" component={Index} /> */}
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Uploads" component={UploadsScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* Remover Stack.Screen Index */}
      {/* <Stack.Screen name="Index" component={TabNavigator} /> */}
      {/* Remover Stack.Screen Route */}
      {/* <Stack.Screen name="Route" component={RouteScreen} /> */}
      {/* Adicione o TabNavigator como Home */}
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
}
