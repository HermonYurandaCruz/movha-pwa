import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; // Importa os ícones do Expo

import HomeSemConta from '../HomeSemConta';
import Search from '../Search';
import Stands from '../Stands';
import Mechanics from '../Mechanics'




const Tab = createBottomTabNavigator();

export default function TabScreenSemConta() {
  return (
    <Tab.Navigator
    screenOptions={ ({ route}) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
    

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'Pesquisa') {
          iconName = focused ? 'search' : 'search';
        }else if (route.name === 'Mecanicos') {
            iconName = focused ? 'users' : 'users';

        }else if (route.name === 'Stands') {
          iconName = focused ? 'briefcase' : 'briefcase';
        }

        return <Feather  name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'rgba(19, 64, 116, 1)',

    })}>

      <Tab.Screen name="Home" component={HomeSemConta}  options={{ headerShown: false }}  />
      <Tab.Screen name="Pesquisa" component={Search}  options={{ headerShown: false }}  />
      <Tab.Screen name="Mecanicos" component={Mechanics}  options={{ headerShown: false }}  />
      <Tab.Screen name="Stands" component={Stands}  options={{ headerShown: false }}  />
    
    </Tab.Navigator>
  );
}