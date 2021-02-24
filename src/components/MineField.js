import React from 'react'
import { View, StyleSheet } from 'react-native'
import Field from './Field'

export default props => {

    // -- Mapeia cada elemento da linha, onde 'r' é o indice da linha
    const rows = props.board.map((row, r) => {
        // -- Fazer alguma coisa dentro de cada elemento da linha...

        // -- Mapeia cada elemento da coluna, onde 'c' é o indice da coluna
        const columns = row.map((field, c) => {
            // -- Fazer alguma coisa dentro de cada elemento field da linha...

            // -- Para cada elemento da coluna, retorna um field com todas as propriedades já criadas (row, column, aponned, flagged...)
            return (
                <Field {...field}
                    key={c}
                    onOpen={() => props.onOpenField(r, c) /*passa a função onOpenField (que veio ao App.js) como propriedade para o MineField*/}
                    onSelect={e => props.onSelectField(r, c) /*passa a função onSelectField (que veio ao App.js) como propriedade para o MineField*/} />
            )

        })

        // -- Para cada elemento da linha, retornar uma View com a coluna
        return (
            <View
                key={r}
                style={{ flexDirection: 'row' }}>{columns}
            </View>
        )

    })

    // -- Retornar View com todas as linhas do tabuleiro
    return <View style={styles.container}>{rows}</View>

}

const styles = StyleSheet.create({
    container: {
        // -- Foi colocado diretamente na última view, para que os elementos sejam impressos no eixo horizontal
        //flexDirection: 'row', 
        backgroundColor: '#EEE',
    }
})