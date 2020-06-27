/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import LoadingScreen from './screen/LoadingScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import HomeScreen from './screen/HomeScreen';
import MessageScreen from './screen/MessageScreen';
import NotificationScreen from './screen/NotificationScreen';
import PostScreen from './screen/PostScreen';
import ProfileScreen from './screen/ProfilScreen';
import FirebaseKeys from './config';
import * as firebase from 'firebase';

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Icon name="home" size={24} color={tintColor} />
            ),
          },
        },
        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Icon name="chat" size={24} color={tintColor} />
            ),
          },
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Icon
                name="circle-with-plus"
                size={48}
                color="#E9446A"
                style={{
                  shadowColor: '#E9446A',
                  shadowOffset: {width: 0, height: 0},
                  shadowRadius: 10,
                  shadowOpacity: 0.3,
                }}
              />
            ),
          },
        },
        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Icon name="bell" size={24} color={tintColor} />
            ),
          },
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => (
              <Icon name="user" size={24} color={tintColor} />
            ),
          },
        },
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key === 'Post') {
              navigation.navigate('postModal');
            } else {
              defaultHandler();
            }
          },
        },
        tabBarOptions: {
          activeTintColor: '#161F3D',
          inactiveTintColor: '#B8BBC4',
          showLabel: false,
        },
      },
    ),
    postModal: {
      screen: PostScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack,
    },
    {
      intialRouteName: 'Loading',
    },
  ),
);
