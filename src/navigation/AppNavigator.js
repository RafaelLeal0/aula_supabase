// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import Index from '../screens/index';
// Remover import do SplashScreen
// import SplashScreen from '../screens/SplashScreen';
import Perfil from '../screens/Perfil';
import RouteScreen from '../screens/Route';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Perfil"         // <–– inicia em Perfil
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Index') iconName = 'map-pin';
          else if (route.name === 'Perfil') iconName = 'user';
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
      <Tab.Screen name="Index" component={Index} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Index" component={TabNavigator} />
      <Stack.Screen name="Route" component={RouteScreen} />
    </Stack.Navigator>
  );
}
