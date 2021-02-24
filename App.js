import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import params from './src/params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from './src/functions'
import LevelSelection from './src/screens/LevelSelection'

export default class App extends Component {

  /*
  O this está sendo utilizado das formas abaiox, 
  pois estamos usando componente baseado em classe
  */

  // -- Construtor da classe (primeira coisa a ser chamada)
  constructor(props) {
    super(props);
    // -- Variável da classe que receberá o board inicial criado (objeto)
    // -- O board será criado aqui 
    this.state = this.createState();
  }

  minesAmount = () => {
    // -- Quantidade de colunas
    const cols = params.getColumnsAmount();
    // -- Quantidade de linhas
    const rows = params.getRowsAmount();
    // -- Retorna quantidade de minas
    // -- Math.ceil -> retorna o menor inteiro maior ou igual ao resultado
    return Math.ceil(cols * rows * params.difficultLevel);
  }

  /* Função para saber como está o jogo */
  createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
      // -- Cria o tabuleiro
      board: createMinedBoard(rows, cols, this.minesAmount() /* qde de minas do jogo */),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  /* Função aplicada  */
  onOpenField = (row, column) => {

    // -- Clona o board
    const board = cloneBoard(this.state.board);

    // -- Abre o field
    openField(board, row, column);

    // -- Verifica se existe explosão dentro do tabuleiro
    const lost = hadExplosion(board);

    // -- Verifica se o jogo foi ganho
    const won = wonGame(board)

    // -- Se perdeu
    if (lost) {
      // -- Mostra todas as minas
      showMines(board)
      // -- Alerta a derrota!
      Alert.alert('Perdeeeeu!', 'Que buuuurro!')
    }

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    // -- Setta novo estado passando os atributos board, lost e won
    // -- Para que haja interferência na interface gráfica
    this.setState({ board, lost, won })

  }

  /* Marca as minas com flags */
  onSelectField = (row, column) => {

    // -- Clona o board
    const board = cloneBoard(this.state.board);

    // -- Inverte a flag
    invertFlag(board, row, column);

    // -- Verifica se ganhou
    const won = wonGame(board)

    if (won) {
      Alert.alert('Parabéns', 'Você Venceu!')
    }

    this.setState({ board, won })
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }


  render() {
    return (

      <View style={styles.container}>

        <LevelSelection isVisible={this.state.showLevelSelection}
          onLevelSelected={this.onLevelSelected}
          onCancel={() => this.setState({ showLevelSelection: false })} />

        <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
          onNewGame={() => this.setState(this.createState())}
          onFlagPress={() => this.setState({ showLevelSelection: true })} />

        <View style={styles.board}>
          <MineField board={this.state.board /*passa o board como propriedade para o MineField*/}
            onOpenField={this.onOpenField /*passa a função onOpenField como propriedade para o MineField*/}
            onSelectField={this.onSelectField /*passa a função onSelectField como propriedade para o MineField*/} />
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});