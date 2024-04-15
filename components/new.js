// import React from 'react';
// import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
// import { d } from '../design'; // Assurez-vous d'importer correctement votre fichier de styles
// // import RDV from './rendez-vous'



//   return (

//     <View style={d.fd}>
//       <Text style={d.dollar}>500 $</Text>
//       <Text style={d.score}>15</Text>
//       <Text style={d.title}>Quelle est la definition du mot "pragmatique"?</Text>
//       <Text style={d.reps0}>Idéaliste</Text>
//       <Text style={d.reps1}>Pratique</Text>
//       <Text style={d.reps2}>Rêveur</Text>
//       <Text style={d.reps3}>Mysterieux</Text>


//     </View>

//   );


// export default Sign;import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { d } from '../design';

const questions = [ {
  question: "Quelle est la definition du mot 'pragmatique'?",
  correctAnswer: "Pratique",
  answers: ["Idéaliste", "Pratique", "Rêveur", "Mysterieux"]
},
{
  question: "Quelle est la plus haute montagne au monde ?",
  correctAnswer: "Everest",
  answers: ["Kosciuszko", "Snowdon", "Etna", "Everest"]
},
{
  question: "En langage familier, comment appelle-t-on un court-circuit ?",
  correctAnswer: "Court-jus",
  answers: ["Court-bouillon","Court-vêtu","Court-jus","Court métrage"]
},
{
  question: "Quelle est le plus grand pays de l'Union Européenne, en termes de superficie ?",
  correctAnswer: "France",
  answers: ["Belgique", "Andorre", "Luxembourg", "France"]
},
{
  question: "Lequel de ces animaux est un canidé ?",
  correctAnswer: "Le chien",
  answers: ["Le serpent", "L'otarie", "La vache", "Le chien"]
},
{
  question: "Lequel de ces sports peut se pratiquer en individuel ?",
  correctAnswer: "Javelot",
  answers: ["Hockey", "Football", "Javelot", "Rugby"]
},
{
  question: "De quelle région font partie la Norvège, la Suède et le Danemark ?",
  correctAnswer: "Scandinavie",
  answers: ["Corn de l'Afrique", "Scandinavie", "Indochine", "Amérique centrale"]
},
{
  question: "Lequel de ces mots ne change pas d'orthographe au pluriel ?",
  correctAnswer: "Nez",
  answers: ["Nez", "Cheval", "Seau", "Oeil"]
},
{
  question: "Quel est le nom du fromage frais moulé en form de petit cylindre ?",
  correctAnswer: "Petit-suisse",
  answers: ["Petit-beurre", "Petit-déjeuner", "Petit-four", "Petit-suisse"]
},
{
  question: "Une bicyclette conçue pour deux personnes placées l'une derrière l'autre est un...",
  correctAnswer: "Tadem",
  answers: ["Tadem", "V.T.T", "Vélocipède", "Tricycle"]
},
{
  question: "Lequel de ces instruments de musique n'est pas un instrument à vent ?",
  correctAnswer: "Le violon",
  answers: ["La trompette", "La clarinette", "Le violon", "La flûte"]
},
{
  question: "Quelle est la plus grande île du monde ? ",
  correctAnswer: "Groenland ",
  answers: ["Groenland ", "Madagascar ", "Bornéo", " Nouvelle-Guinée"]
},
{
  question: "Dans quel pays se trouve le Taj Mahal ?",
  correctAnswer: "Inde",
  answers: ["Népal", "Bangladesh", "Pakistan", "Inde"]
},
{
  question: "Trouvez le mot intrus.",
  correctAnswer: " Éloquent",
  answers: ["Verbeux", " Laconique", " Éloquent", "Prolixe"]
},
{
  question: "Quelle est la signification de l'expression 'mettre la charrue avant les bœufs'?",
  correctAnswer: "Agir sans réfléchir",
  answers: ["Être trop lent", "Faire les choses dans le bon ordre", "Agir sans réfléchir", "Éviter les problèmes"]
},
{
  question: "Quel est le pluriel du mot 'bijou' ?",
  correctAnswer: "Bijoux",
  answers: ["Bijous", "Bijousx", "Bijoux", "Bijouxs"]
},
{
  question: "Quel est le plus grand lac d'Amérique du Nord ? ",
  correctAnswer: "Lac Supérieur",
  answers: ["Lac Michigan ", "Lac Supérieur", "Lac Huron", "Lac Érié"]
},
{
  question: "Trouvez l'orthographe correcte.",
  correctAnswer: "Exagérer",
  answers: ["Exagérer", "Eggzagérer", "Éxagérer", "Exajérer"]
},
{
  question: "Qui est souvent considéré comme le père de la philosophie occidentale ?",
  correctAnswer: "Socrate",
  answers: ["Socrate", "Aristote", "Platon", "Confucius"]
},
{
  question: "Quel est le principal constituant de l'atmosphère terrestre ?",
  correctAnswer: "Azote",
  answers: ["Oxygène", "Azote", "Dioxyde de carbone", "Argon"]
},]; // Vos questions ici

const CongratulationsScreen = ({ onNewGame, onMainMenu, onQuit, dollar }) => (
  <View style={d.fd}>
    <Text style={d.vs}>Vous avez gagné {dollar} $</Text>
    
    <TouchableOpacity onPress={onNewGame}>
      <Text style={d.np}><Icon name="calendar" size={21} color="white" /> Nouvelle partie</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onMainMenu}>
      <Text style={d.mp}><Icon name="home" size={22} color="white" /> Menu principal</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onQuit}>
      <Text style={d.q}><Icon name="sign-out" size={22} color="white" /> Quitter</Text>
    </TouchableOpacity>
  </View>
);

const New = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [dollar, setDollar] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [remainingQuestions, setRemainingQuestions] = useState([]);

  useEffect(() => {
    // Mélanger les questions au chargement de la composante
    setRemainingQuestions(shuffleArray(questions));
  }, []);

  const navigation = useNavigation();

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = remainingQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setDollar(dollar + 500);
    } else {
      setGameOver(true);
    }
    if (currentQuestionIndex + 1 >= 15) {
      // Si le nombre de questions répondues atteint 15, déclencher le game over
      setGameOver(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleNewGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setDollar(0);
    setGameOver(false);
    setRemainingQuestions(shuffleArray(questions));
  };

  const handleMainMenu = () => {
    navigation.navigate('App');
  };

  const handleQuit = () => {
    BackHandler.exitApp();
  };

  if (gameOver) {
    return (
      <CongratulationsScreen
        dollar={dollar}
        onNewGame={handleNewGame}
        onMainMenu={handleMainMenu}
        onQuit={handleQuit}
      />
    );
  }

  if (currentQuestionIndex >= remainingQuestions.length) {
    setGameOver(true);
    return null;
  }

  const currentQuestion = remainingQuestions[currentQuestionIndex];

  return (
    <View style={d.fd}>
      <Text style={d.dollar}>{dollar} $</Text>
      <Text style={d.score}>{score}/15</Text>
      <Text style={d.title}>{currentQuestion.question}</Text>
      {currentQuestion.answers.map((answer, index) => (
        <TouchableOpacity key={index} onPress={() => handleAnswer(answer)} style={d.reps}>
          <Text style={d.ans}>{answer}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={d.retour}>
        <Text style={d.retr}>. . .</Text>
      </TouchableOpacity>
    </View>
  );
};

export default New;


