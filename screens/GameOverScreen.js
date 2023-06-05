import {
    Text,
    View,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView
} from "react-native";

import Title from "../components/ui/Title";
import Colors from "../constants/Colors";
import PrimaryButton from "../components/ui/PrimaryButton";

// import * as utilitiesFunctions from "../helpers/utilitiesFunction";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
    const { width, height } = useWindowDimensions();

    let imageSize = 300;

    if (width < 380) {
        imageSize = 150;
    }

    if (height < 420) {
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2,
    }
    // utilitiesFunctions.sum();
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.rootContainer}>
                <Title>GAME OVER!</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image source={require('../public/assets/images/success.png')}
                        style={styles.image} />
                </View>
                <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the Number <Text style={styles.highlight}>{userNumber}</Text>.</Text>
                <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        // width: 300,
        // height: 300,
        // borderRadius: 200,
        overflow: 'hidden',
        borderWidth: 3,
        borderBottomColor: Colors.primary800,
        margin: 36,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'center'
    },
    summaryText: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    highlight: {
        color: Colors.primary500
    },
    imageContainerWide: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 3,
        borderBottomColor: Colors.primary800,
        overflow: 'hidden',
        margin: 12
    }
})