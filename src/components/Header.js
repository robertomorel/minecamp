import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Flag from './Flag'

export default props => {
    return (

        <View style={styles.container}>

            <View style={styles.flagContainer}>
                <TouchableOpacity onPress={props.onFlagPress}
                    style={styles.flagButton}>
                    <Flag bigger /*Vai imprimir na tela a flag maior*//>
                </TouchableOpacity>
                <Text style={styles.flagsLeft}>= {props.flagsLeft /*quantas flags ainda faltam no jogo*/}</Text>
            </View>

            <TouchableOpacity style={styles.button}
                onPress={props.onNewGame}>
                <Text style={styles.buttonLabel}>Novo Jogo</Text>
            </TouchableOpacity>

        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1, // -- Crescer a área permitida
        flexDirection: 'row', // -- O padrão é row (mainAxes)
        backgroundColor: '#EEE',
        alignItems: 'center', // -- Centralização no crossAxes no centro (vertical)
        justifyContent: 'space-around', // -- Espaço entre os componente horizontalmente
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    flagContainer: {
        flexDirection: 'row',
    },
    flagButton: {
        marginTop: 10,
        minWidth: 30
    },
    flagsLeft: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
    },
    button: {
        backgroundColor: '#999',
        padding: 5,
    },
    buttonLabel: {
        fontSize: 20,
        color: '#DDD',
        fontWeight: 'bold'
    }
})