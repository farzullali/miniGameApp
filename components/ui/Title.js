import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function Title({ children }) {
    return <Text style={styles.title}>{children}</Text>
}

export default Title;

const styles = StyleSheet.create({
    title: {
        // fontFamily: 'open-sans-bold',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
        textAlign: 'center',
        maxWidth: '80%',
        width: 300
    }
})