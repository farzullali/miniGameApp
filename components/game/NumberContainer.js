import { View, Text, StyleSheet, Dimensions } from 'react-native';

import Colors from '../../constants/Colors';

function NumberContainer({ children }) {
    return (
        <View style={styles.numberContainer}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    numberContainer: {
        margin: deviceWidth < 380 ? 12 : 24,
        padding: deviceWidth < 380 ? 12 : 24,
        borderWidth: 2,
        borderColor: Colors.accent,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberText: {
        color: Colors.accent,
        // textAlign: 'center',
        // fontFamily: 'open-sans-bold',
        fontSize: 36,
        fontWeight: 'bold'
    }
})