import React from 'react';
import { View, StyleSheet } from 'react-native';

/*
Cria o componente (desenho) da mina
*/

export default (props) => {

    return (

        <View style={styles.container}>
            <View style={styles.coreMine} />
            <View style={styles.line} /> 
            <View style={[styles.line, { transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.line, { transform: [{ rotate: '90deg' }] }]} />
            <View style={[styles.line, { transform: [{ rotate: '135deg' }] }]} />
        </View>

    );

};

const styles = StyleSheet.create({

    container: {
        // -- Flexbox 
        alignItems: 'center', // -- Centro no main Axes
        justifyContent: 'center', // -- Centro no cross Axes
    },

    coreMine: {
        height: 14,
        width: 14,
        borderRadius: 10, // -- Borda arredondada
        backgroundColor: '#000', // -- Mina será preta
        alignItems: 'center',
        justifyContent: 'center',
    },

    line: {
        position: 'absolute',
        height: 3,
        width: 20,
        borderRadius: 3,
        backgroundColor: 'black',
    },

});