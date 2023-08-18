import React from 'react';
import OnboardingScreen from '../screens/OnboardingScreen';
import SplashScreen from '../screens/SplashScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskListScreen from '../screens/TaskListScreen';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        options={{headerShown: false}}
        component={SplashScreen}
      />
      <Stack.Screen
        name="OnboardingScreen"
        options={{headerShown: false}}
        component={OnboardingScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TaskList"
        component={TaskListScreen}
      />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
