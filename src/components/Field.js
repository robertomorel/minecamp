import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import params from '../params';
import Mine from './Mine';
import Flag from './Flag';

export default props => {

    // -- Desestruturação do objeto props (características possíveis do field)
    // -- mined -> caso o campo não tenha um número, mas uma mina
    // -- opened -> se o campo estiver aberto 
    // -- exploded -> se a mina explodiu
    // -- Se foi marcado com uma bandeira
    const { mined, opened, nearMines, exploded, flagged } = props;

    // -- Inicializa array de estilos para cada campo styleField
    const styleField = [styles.field];

    // -- Se campo está aberto, adiciona ao array o estilo 'opened'
    if (opened)
        styleField.push(styles.opened);

    // -- Se a propriedade exploded for passada, terá um estilo específico
    // -- O campo ficará com um estilo em vermelho  
    if (exploded)
        styleField.push(styles.exploded);

    // -- Deve forçar o estilo regular 
    if (flagged)
        styleField.push(styles.flagged);

    // -- Se existe apenas um elemento no array (campo ainda está fechado), adiciona ao array o estilo 'regular' 
    if (!opened && !exploded)
        styleField.push(styles.regular);

    // -- Quantas minas estão presentes na propriedade 'nearMine'
    let color = null;
    // -- Lógica para settar uma cor de texto dependendo da quantidade de minas ao redor
    if (nearMines > 0) {

        if (nearMines == 1)
            color = '#2A28D7';
        else if (nearMines == 2)
            color = '#2B520F';
        else if (nearMines > 2 && nearMines < 6)
            color = '#F9060A';
        else if (nearMines >= 6)
            color = '#F221A9';
        else
            color = '#999';

    }

    return (

        <TouchableWithoutFeedback onPress={props.onOpen}
            onLongPress={props.onSelect}>

            <View style={styleField}>

                { // -- Condição para renderização do texto do número impresso no campo
                    // -- Não pode ser uma mina + Precisa estar aberto + precisa ter minas por perto
                    (!mined && opened && nearMines > 0) ?
                        <Text style={[styles.label, { color: color }]}>{nearMines}</Text> :
                        false
                }
                {
                    (mined && opened) ? <Mine /> : false
                }
                {
                    (!opened && flagged) ? <Flag /> : false
                }

            </View>

        </TouchableWithoutFeedback>

    );

};

const styles = StyleSheet.create({

    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },

    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },

    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },

    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize
    },

    exploded: {
        backgroundColor: '#F9062A',
        borderColor: '#F9060A',
    },

});