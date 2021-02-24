import { Dimensions } from 'react-native';

const params = {

    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.15, // -- Proporção do painel superior da tela (cabeçalho) 
    difficultLevel: 0.1, // -- Percentual de campos que estão na tela com mina
    getColumnsAmount() {
        const width = Dimensions.get('window').width; // -- Largura da tela
        // -- Floor arredonda para baixo
        return Math.floor(width / this.blockSize); // -- Largura por blocos
    },
    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height; // -- Altura da tela
        // -- Floor arredonda para baixo
        const borderHeight = totalHeight * (1 - this.headerRatio); // -- Altura utilizada é a total - a usada para o cabeçalho
        return Math.floor(borderHeight / this.blockSize); // -- Altura por blocos
    },

};

export default params;