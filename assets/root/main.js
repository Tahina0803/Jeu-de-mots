import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sign from '../../components/insription';
import RDV from '../../components/rendez-vous';
const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="Sign" component={Sign} options={{ headerShown: false }} />
        <Stack.Screen name="RDV" component={RDV} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;