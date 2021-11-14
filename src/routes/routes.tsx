import React from 'react';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ShowInformation } from '../screens/ShowInformation';
import { EpisodeDetails } from '../screens/EpisodeDetails';
import { theme } from '../global/styles/theme';
import { Shows } from '../screens/Shows';

const { Navigator, Screen } = createNativeStackNavigator();
const { Screen: TabScreen, Navigator: TabNavigator } =
  createBottomTabNavigator();

function ShowInformationRoutes() {
  return (
    <Navigator
      initialRouteName="ShowInformation"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.secondary100 },
      }}
    >
      <Screen name="ShowInformation" component={ShowInformation} />

      <Screen name="EpisodeDetails" component={EpisodeDetails} />
    </Navigator>
  );
}

export function Routes() {
  return (
    <NavigationContainer>
      <TabNavigator
        initialRouteName="Show Info"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.highlight,
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 88 : 64,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.secondary100,
            borderTopColor: theme.colors.primary,
            paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          },
        }}
      >
        <TabScreen
          name="Show Info"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="tv" size={size} color={color} />
            ),
          }}
          component={ShowInformationRoutes}
        />

        <TabScreen
          name="Shows"
          component={Shows}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Feather name="list" size={size} color={color} />
            ),
          }}
        />
      </TabNavigator>
    </NavigationContainer>
  );
}
