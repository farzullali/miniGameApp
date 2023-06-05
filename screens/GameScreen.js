import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, FlatList, Text, ScrollView, useWindowDimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons'

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

import GuessLogItem from "../components/game/GuessLogItem";


//generate random guess number
function generateRandomBetween(min, max, exclude) {
    const rndNumber = Math.floor(Math.random() * (max - min)) + min;

    if (rndNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNumber;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    // when user input number first time run random number method
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    //set initial random number to usestate
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();

    //check randomGuessNumber and userNumber every times currentGuess will be update
    useEffect(() => {
        if (currentGuess === userNumber || guessRounds.length >= 3) {
            onGameOver(guessRounds.length);
            // counter=0;
        }
    }, [currentGuess, userNumber, onGameOver]);

    //when first time rendered UI(so started new guessing)
    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    // if (counter === 3) {
    //     return <p>haqqin bitdi</p>
    // }

    //give area which generate random guess number and control logic  
    function nextGuessHandler(direction) {
        //if userNumber(input) higher from guess and user click lower
        // or reverse 
        if ((direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert("Don't Lie!", 'You know, that is wrong', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        //generate next guess number
        const nextGuessNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(nextGuessNumber);
        setGuessRounds((previousGuessRound) => {
            return [nextGuessNumber, ...previousGuessRound]
        });
    }

    const guessRoundsListLength = guessRounds.length;


    let content = <><NumberContainer>
        {currentGuess}
    </NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color='white' />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </PrimaryButton>
                </View>
            </View>
        </Card></>

    if (width > 500) {
        content = <>
            <View style={styles.listContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <Ionicons name="md-remove" size={24} color='white' />
                    </PrimaryButton>
                </View>
                <NumberContainer>
                    {currentGuess}
                </NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name='md-add' size={24} color='white' />
                    </PrimaryButton>
                </View>
            </View>

        </>
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {/* show the initial random number */}
            {content}
            <View style={styles.listContainer}>

                <FlatList data={guessRounds}
                    keyExtractor={(item) => item}
                    renderItem={(itemData) => {
                        return <GuessLogItem
                            guess={itemData.item}
                            roundNumber={guessRoundsListLength - itemData.index} />
                    }} />
            </View>
        </View>

    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        marginTop: 10,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    },
    instructionText: {
        marginBottom: 12,
    },
    listContainer: {
        flex: 1,
        padding: 16,

    },
    listContainerWide: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})