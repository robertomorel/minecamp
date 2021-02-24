/*
Criação do tabuleiro

Vai criar uma matriz com cada elemento 
sendo um objeto de atributos de um field
*/
const createBoard = (rows, columns) => {

    /* 
    Map: primeiro parâmetro é o elemento; segundo parâmetro é o índice; terceiro é o próprio array
    O map irá mapear um array em outro de exatamente o mesmo tamanho 
    */

    // -- Cria um Array com 'rows' elementos e preenche tudo com 0
    // -- Cria um map (retorna array ajustado por função, mas de mesmo tamanho)
    // -- Cria um Array com 'colunms' elementos e preenche tudo com 0
    // -- Ou seja, está acriando uma matriz rowsxcolunms
    // Primeiramente preenchendo tudo com 0
    return Array(rows).fill(0).map((_, row) => {

        // -- Dentro de cada linha, criamos uma coluna    
        return Array(columns).fill(0).map((_, column) => {

            // -- Para cada elemento da matriz, jogar um objeto com as características abaixo    
            return ({
                row, /*row: row,*/
                column, /*columns: columns*/
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0,
            });

        });

    });

};

/*
Espalhando as minas no tabuleiro

O método irá criar aleatoriamente as minas no total 
de minesAmount
*/
const spreadMines = (board, minesAmount) => {

    const rows = board.length;
    const columns = board[0].length;
    let minesPlanted = 0;

    while (minesPlanted < minesAmount) {
        // -- Escolher aleatoriamenta a linha para settar a mina
        const rowSel = parseInt(Math.random() * rows, 10);
        // -- Escolher aleatoriamenta a coluna para settar a mina
        const columnSel = parseInt(Math.random() * columns, 10);

        // -- Se ainda não existe mina no quadro escolhido
        if (!board[rowSel][columnSel].mined) {
            board[rowSel][columnSel].mined = true
            minesPlanted++
        }
    }
};

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

/* 
Método para criar um clone do board com o map (for criando um novo array de mesmo tamanho)
Com o react, não mexemos diretamente na referência do objeto, mas criamos novos objetos,
que é a evolução do estado. "Paradigma funcional".
*/
const cloneBoard = board => {
    // -- Percorre as linhas do board
    return board.map(rows => {
        // -- Percorre as colunas de cada linha
        return rows.map(field => {
            // -- Retorna o field referente com todos os atributos
            return { ...field }
        })
    })
}

/*
Método para pegar os vizinhos em determinado nó
*/
const getNeighbors = (board, row, column) => {

    // -- Array de vizinhos
    const neighbors = []
    // -- Calcula arr de linhas vizinhas
    const rows = [row - 1, row, row + 1];
    // -- Calcula arr de colunas vizinhas
    const columns = [column - 1, column, column + 1];

    // -- Laço nas linhas
    rows.forEach(r => {

        // -- Laço nas colunas
        columns.forEach(c => {

            // -- Se pelo menos um dos dois forem diferentes, não é o elemento do nó
            const diferent = r !== row || c !== column;
            // -- A linha é válida? 
            const validRow = r >= 0 && r < board.length;
            // -- A coluna é válida? 
            const validColumn = c >= 0 && c < board[0].length;

            if (diferent && validRow && validColumn) {
                // -- Armazena o vizinho na lista
                neighbors.push(board[r][c])
            }

        })

    })

    // -- Retorna array de vizinhos
    return neighbors
}

/*
Método para verificar se um determinado vizinho tem mina, ou não (safe)
Se não tiver nenhum vizinho com mina, retorna true 
*/
const safeNeighborhood = (board, row, column) => {
    // -- A função "safes" é necessária para a reduce. 
    /* 
    reduce:
       Percorre um array executando uma função que possui um argumento result passado por referência
       Para cada etapa do laço a função (result && !neighbor.mined) é executada e a referência
       'result' é atualizada. 
       O segundo parâmetro do reduce indica como vai iniciar a variável.
       Ao final, retorna true ou false.
       */
    const safes = (result, neighbor) => result && !neighbor.mined;
    return getNeighbors(board, row, column).reduce(safes, true);

}

/*
Método utilizado para abrir um determinado field em um nó
field.oppened = true;
*/
const openField = (board, row, column) => {

    const field = board[row][column];

    if (!field.opened) {

        field.opened = true;

        // -- Se field tiver uma mina
        if (field.mined) {
            field.exploded = true;
        // -- Se não tiver uma mina e todos os seus vizinhos forem seguros    
        } else if (safeNeighborhood(board, row, column)) {
            // -- Faz um laço em todos os vizinhos
            // -- Chama recursivamente o openField
            getNeighbors(board, row, column).forEach(n => openField(board, n.row, n.column))
        // -- Se existir um mina em algum dos vizinhos
        } else {
            // -- Pega todos os vizinhos
            const neighbors = getNeighbors(board, row, column);
            // -- Busca qde de minas próximas
            // -- Faz um laço que retorna novo array filtra por uma condição em uma função
            // -- Retorna todos os vizinhos com minas
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}

// -- Junsta todos os arrays do board de forma linear para gerar todos os fields
const fields = board => [].concat(...board)

// -- Verifica se pelo menos um field explodiu
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0

// -- Pendente: para saber se o usuário ganhou ou não o jogo
// -- Usuário não descobriu todos os campos
// -- Usuário descobriu um campo minado e não marcou com uma flag
const pendding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)

// -- Saber se o usuário ganhou ou não o jogo
const wonGame = board => fields(board).filter(pendding).length === 0

// -- Mostrar as minas que existem no jogo
// -- Após gerar a explosão, todas as minas serão exibidas
// -- Filtra os campos minados e listas todos os fields abrindo-os
const showMines = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true)

// -- Retira a flag de um determinado campo    
const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

// -- Retorna quantidade de flags do tabuleiro
const flagsUsed = board => fields(board)
    .filter(field => field.flagged).length

export {
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
}