import { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Alert,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'

import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Colors from '../constants/Colors';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen({ onPickNumber }) {
    // input state
    const [enteredNumber, setEnteredNumber] = useState();

    const { width, height } = useWindowDimensions();

    //set entered input value to enteredNumber State
    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }
    //confirm button click
    function confirmInputHandler() {
        const number = parseInt(enteredNumber);

        // check entered value for this is valid or invalid value for next step
        if (isNaN(number) || number <= 0 || number > 99) {
            Alert.alert(
                'Invalid number',
                'Number has to be a number between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            );
            return;
        }
        //send app.js useState entered and checked user value
        onPickNumber(number);
    }
    //reset button click
    function resetInputHandler() {
        setEnteredNumber('');
    }

    const marginTopDistance = height < 400 ? 30 : 100;

    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='position'>
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a Number</InstructionText>
                        <TextInput style={styles.numberInput}
                            maxLength={2}
                            keyboardType='number-pad'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={numberInputHandler}
                            value={enteredNumber}
                        />

                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // marginTop: deviceHeight < 380 ? 30 : 100,
        alignItems: 'center'
    },

    numberInputContainer: {
        alignItems: 'center',
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent,
        borderBottomWidth: 2,
        color: Colors.accent,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1
    }
})