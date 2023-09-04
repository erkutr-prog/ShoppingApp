import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from './Cart';
import Explore from './Explore';
import Favourites from './Favourites';
import Products from './Products';
import Purchase from './Purchase';
import {RootStackParamList} from '../models/TabParamsList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from './Profile';

type Props = {};

const Tab = createBottomTabNavigator<RootStackParamList>();

const Main = (props: Props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Products"
        component={Products}
        options= {{
          tabBarIcon: ({focused})=> (
            <MaterialCommunityIcons
              name={focused ? 'shopping' : 'shopping-outline'}
              size={25}
            />
          )
        }}
        initialParams={{category: 'all'}}
      />
      <Tab.Screen name="Explore" options={{
        tabBarIcon: ({focused}) => (
          <Ionicons
            name={focused ? 'compass' : 'compass-outline'}
            size={25}
          />
        )
      }} component={Explore} />
      <Tab.Screen name="Cart" options={{
        tabBarIcon: ({focused}) => (
          <Ionicons
            name={focused ? 'cart' : 'cart-outline'}
            size={25}
          />
        )
      }} component={Cart} />
      <Tab.Screen name="Favourites" options={{
        tabBarIcon: ({focused}) => (
          <MaterialIcons
            name={focused ? 'favorite' : 'favorite-outline'}
            size={25}
          />
        )
      }} component={Favourites} />
      <Tab.Screen name="Profile" options={{
        tabBarIcon: ({focused}) => (
          <Ionicons
            name={focused ? 'person' : 'person-outline'}
            size={25}
          />
        )
      }} component={Profile} />
    </Tab.Navigator>
  );
};

export default Main;
