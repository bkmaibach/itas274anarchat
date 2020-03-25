
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import ConvoListScreen from '../screens/ConvoListScreen';
import ConvoScreen from '../screens/ConvoScreen';
// import CategoryMealsScreen from '../screens/CategoryMealsScreen';
// import MealDetailsScreen from '../screens/MealDetailsScreen';

const Stack = createStackNavigator();

function ChatNavigator() {
  console.log("RENDERING NAVIGATOR");
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='ConvoList'
        screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: Colors.primary
          }
        }}
      >
        <Stack.Screen
          name='ConvoList'
          component={ConvoListScreen}
          options={{
            title: 'Conversations',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: 'white'
          }}
        />
        <Stack.Screen
          name='Convo'
          component={ConvoScreen}
          options={({route}) => ({
            title: route.params["title"],
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ChatNavigator