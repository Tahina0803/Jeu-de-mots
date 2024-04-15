import React, { useState, useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importez AsyncStorage
import { useNavigation } from '@react-navigation/native'; 

const ChallengeScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [playedGames, setPlayedGames] = useState([]);

  useEffect(() => {
    // Chargez la date précédemment sélectionnée et les jeux joués lors du montage du composant
    loadSelectedDate();
    loadPlayedGames();
  }, []);

  const navigation = useNavigation();

  const loadSelectedDate = async () => {
    try {
      const storedDate = await AsyncStorage.getItem('selectedDate');
      if (storedDate !== null) {
        setSelectedDate(storedDate);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la date sélectionnée :', error);
    }
  };

  const loadPlayedGames = async () => {
    try {
      const jsonPlayedGames = await AsyncStorage.getItem('playedGames');
      if (jsonPlayedGames !== null) {
        setPlayedGames(JSON.parse(jsonPlayedGames));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des jeux joués :', error);
    }
  };

  const handleDateSelect = async (date) => {
    // Vérifiez si la date sélectionnée est aujourd'hui ou une date antérieure
    const currentDate = new Date();

    const selectedDateTime = new Date(date);
    if (selectedDateTime <= currentDate) {
      setSelectedDate(date);
      try {
        // Enregistrez la date sélectionnée
        await AsyncStorage.setItem('selectedDate', date);
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la date sélectionnée :', error);
      }
    } else {
      // Alert.alert('Vous ne pouvez pas sélectionner une date future');
    }
  };

  const startGame = async () => {
    if (selectedDate === '') {
      Alert.alert('Sélectionnez une date pour commencer le jeu');
    } else {
      const newGame = { date: selectedDate, completed: false };
      setPlayedGames([...playedGames, newGame]);
      try {
        await AsyncStorage.setItem('playedGames', JSON.stringify([...playedGames, newGame]));
        navigation.navigate('New');
        //  Alert.alert('Jeu démarré le ' + selectedDate);
       
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement du jeu joué :', error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={(day) => handleDateSelect(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'blue' }
        }}
      />
      <Button title="Jouer" onPress={startGame} />
    </View>
  );
};

export default ChallengeScreen;
