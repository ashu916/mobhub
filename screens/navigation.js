import * as React from 'react';
import { Button,Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PhoneVerification from './signUp'
import LoginScreen from './loginScreen.jsx'
import NewSignUpScreen from './NewSignupScreen';
import HomeScreen from './homeScreen';                          

import WelcomeScreen from './welcomeScreen';
const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator 
      initialRouteName='WelcomeScreen' 
      screenOptions={{
        headerShown: false
        }}>
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
           <Stack.Screen name='loginScreen' component={LoginScreen} />
      <Stack.Screen name='NewSignUpScreen' component={NewSignUpScreen}></Stack.Screen>
       
        
        <Stack.Screen name='Home' component={HomeScreen} />
         
      </Stack.Navigator>
    </NavigationContainer>



  );
};




  export default MyStack