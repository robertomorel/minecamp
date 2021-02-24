import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal
} from 'react-native'

export default props => {

    return (

        /*
        Após pressionar em qlqr um dos níveis, a funtão onLevelSelected do App.js
        é chamada. Esta função vai settar a variável difficultLevel e settar também 
        um novo estado. Quando isso acontecer, showLevelSelection será falso, e o Modal
        irá sumir
        */

        <Modal onRequestClose={props.onCancel /*requisição para fechar*/}
            visible={props.isVisible /*setVibible*/} animationType='slide'
            transparent={true}>

            <View style={styles.frame}>
                <View style={styles.container}>

                    <Text style={styles.title}>Selecione o Nível</Text>

                    <TouchableOpacity
                        style={[styles.button, styles.bgEasy]}
                        onPress={() => props.onLevelSelected(0.1)}>
                        <Text style={styles.buttonLabel}>Fácil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.bgNormal]}
                        onPress={() => props.onLevelSelected(0.2)}>
                        <Text style={styles.buttonLabel}>Intermediário</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.bgHard]}
                        onPress={() => props.onLevelSelected(0.3)}>
                        <Text style={styles.buttonLabel}>Difícil</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </Modal>

    )
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    container: {
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 10,
        padding: 5,
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold',
    },
    bgEasy: {
        backgroundColor: '#49b65d'
    },
    bgNormal: {
        backgroundColor: '#2765F7'
    },
    bgHard: {
        backgroundColor: '#F26337'
    }
})