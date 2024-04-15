import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar} from 'react-native';
import { s } from './style'; // Assurez-vous d'importer correctement votre fichier CSS contenant les styles
import {t} from './text';


const Accueil = () => {
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
  navigation.navigate('Sign');
};
    return (
        <View style={s.container}>

        <View style={s.fullScreen}>           
            <TouchableOpacity style={s.button} onPress={handleButtonPress}> 
              <Text style={t.buttonText}>Start</Text>
            </TouchableOpacity>
            <Image source={require('./assets/ima.png')} style = {t.b}/>
            <Text style={t.text}> MedMemo </Text> 
            <Text style={t.texte}> Organisation médicale et pré-inscription. </Text> 
             
        </View>
        <StatusBar hidden={hideBottomNavigationBar} /> 


    </View>
  );

}
export default Accueil;