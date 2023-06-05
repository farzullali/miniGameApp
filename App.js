import { useState } from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { useFonts } from 'expo-font';
// import AppLoading from 'expo-app-loading';
// import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/Colors';




export default function App() {
  //input userNumber state
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);



  // const [fontsLoaded] = useFonts({
  //   'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  //   'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  // });

  // if(!fontsLoaded){
  //   return <AppLoading />
  // }



  //set input number(from user StartGameScreen) to userNumber(useState)
  //when start new game gameIsOver state will be false
  // function pickedNumberHandler(pickedNumber) {
  //   setUserNumber(pickedNumber);
  //   setGameIsOver(false);
  // }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  //when game is over, then will work this function
  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  //start new game and reset old game datas
  function startNewGameHandler() {
    setUserNumber(null);
    setGuessRounds(0);
  }

  //change screen without third party packages
  //screen is variable whatever it's *CONTROLLING WHICH SCREEN* when rendered
  // get value from StartGameScreen JSX onPickNumber
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />


  // Variables (Ternary Operator ile)
  let _screen = userNumber && <StartGameScreen onPickNumber={pickedNumberHandler} />;


  //*control screens* if user add input number then change gamescreen

  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }

  // if gameIsOver true and userNumber has value(so game was starting after user input value)
  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber}
      roundsNumber={guessRounds}
      onStartNewGame={startNewGameHandler} />
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent]}
      style={styles.rootScreen}>
      <ImageBackground source={require('./public/assets/images/dices.jpg')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundStyle}>

        {/* SafeAreaView only works on iOS */}
        <SafeAreaView style={styles.rootScreen}>
          {/* which will game screen render*/}
          {screen}
          {/* {_screen} */}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,

  },
  backgroundStyle: {
    opacity: 0.15
  }
});
