import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar,BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { s } from './style'; // Assurez-vous d'importer correctement votre fichier CSS contenant les styles
import { t } from './texto';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import New from './components/new';
import ChallengeScreen from './components/challenge';




const App = ({ navigation }) => {
  const [statusBarVisible, setStatusBarVisible] = useState(true);
  // Utiliser useNavigation pour obtenir l'objet de navigation
  useEffect(() => {
    // Masquer la barre de navigation supérieure au lancement de l'application
    StatusBar.setHidden(true);
  }, []);

  // Fonction pour afficher la barre de navigation lorsque l'utilisateur touche l'écran
  const handleScreenPress = () => {
    setStatusBarVisible(true);
  };

  // Masquer la barre de navigation inférieure lorsque la barre de navigation supérieure est visible
  const hideBottomNavigationBar = statusBarVisible ? true : false;

  const handleButtonPress = () => {
    console.log('Bouton appuyé !');
    navigation.navigate('New');
  }; const handleDefiPress = () => {
    console.log('Bouton appuyé !');
    navigation.navigate('ChallengeScreen');
  };
  const handleQuitPress = () => {
    console.log('Bouton "Quitter" appuyé !');
    BackHandler.exitApp(); // Cette ligne quitte l'application
  };




  return (
    <View style={s.container}>
      <TouchableOpacity onPress={handleScreenPress} style={{ flex: 1 }}>
        <View style={s.fullScreen}>

          <Text style={t.texto}>  <Icon name="money" size={20} color="#900" /> millions <Icon name="money" size={20} color="#900" /></Text>
          <Image source={require('./assets/gg.png')} style={t.b} />
          {/* <Text style={t.text}> MedMemo </Text> 
            
            <Text style={t.texte}> Organisation médicale et pré-inscription. </Text>  */}
          <TouchableOpacity style={[s.button0, { flexDirection: 'row' }]} onPress={handleButtonPress}>
            <Text style={t.buticon}>
              <Icon name="gamepad" size={30} color="white" />
            </Text>
            <Text style={t.buttonText}>Nouvelle partie</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.button0, { flexDirection: 'row' }]} onPress={handleDefiPress}>
            <Text style={t.buticon}>
              <Icon name="calendar" size={30} color="white" />
            </Text>
            <Text style={t.buttonText}>Défi Quotidien</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.button0, { flexDirection: 'row' }]} onPress={handleQuitPress}>
            <Text style={t.buticon}>
              <Icon name="sign-out" size={30} color="white" />
            </Text>
            <Text style={t.buttonText}>Quitter</Text>
          </TouchableOpacity>


        </View>
        <StatusBar hidden={hideBottomNavigationBar} />
      </TouchableOpacity>

    </View>
  );
};
const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App} options={{ headerShown: false }} />
        <Stack.Screen name="New" component={New} options={{ headerShown: false }} />
        <Stack.Screen name="ChallengeScreen" component={ChallengeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={App} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;
