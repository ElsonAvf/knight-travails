const validMoves = path => {
  let moves = []
  const currentSquare = path[path.length - 1]
  if(currentSquare[0] + 2 <= 7 && currentSquare[1] + 1 <= 7) {
    moves.push([...path, [currentSquare[0] + 2, currentSquare[1] + 1]])
  }
  if(currentSquare[0] + 1 <= 7 && currentSquare[1] + 2 <= 7) {
    moves.push([...path, [currentSquare[0] + 1, currentSquare[1] + 2]])
  }
  if(currentSquare[0] - 1 >= 0 && currentSquare[1] + 2 <= 7) {
    moves.push([...path, [currentSquare[0] - 1, currentSquare[1] + 2]])
  }
  if(currentSquare[0] - 2 >= 0 && currentSquare[1] + 1 <= 7) {
    moves.push([...path, [currentSquare[0] - 2, currentSquare[1] + 1]])
  }
  if(currentSquare[0] - 2 >= 0 && currentSquare[1] - 1 >= 0) {
    moves.push([...path, [currentSquare[0] - 2, currentSquare[1] - 1]])
  }
  if(currentSquare[0] - 1 >= 0 && currentSquare[1] - 2 >= 0) {
    moves.push([...path, [currentSquare[0] - 1, currentSquare[1] - 2]])
  }
  if(currentSquare[0] + 1 <= 7 && currentSquare[1] - 2 >= 0) {
    moves.push([...path, [currentSquare[0] + 1, currentSquare[1] - 2]])
  }
  if(currentSquare[0] + 2 <= 7 && currentSquare[1] - 1 >= 0) {
    moves.push([...path, [currentSquare[0] + 2, currentSquare[1] - 1]])
  }
  // Transforma os arrays do path em str para facilitar a comparação
  const comparablePath = path.map(square => JSON.stringify(square))
  // Filtra os movimentos que ainda não foram feitos para evitar um loop infinito
  moves = moves.filter(move => comparablePath.indexOf(JSON.stringify(move[move.length - 1])) === -1)
  return moves
}

const findShortestPath = (validMoves, end, queue, shortestPath) => {
  let biggerPaths = 0
  for(let i = 0; i < validMoves.length; i++) {
    let lastMove = validMoves[i][validMoves[i].length - 1]
    if(JSON.stringify(lastMove) === JSON.stringify(end)) {
      if(shortestPath.length === 0 || validMoves[i].length < shortestPath[0].length) {
        shortestPath.splice(0, 1, ...validMoves[i])
      }
    } else if(shortestPath.length === 0 || shortestPath[0].length > validMoves[i].length) {
        queue.push(validMoves[i])
    }
    if (shortestPath.length !== 0 && shortestPath[0].length < validMoves[i].length) {
      biggerPaths++
    }
  }
  // Se todos os movimentos válidos são maiores que o shortestPath retorna true para parar o loop, já que, se todos os próximos movimentos serão maiores que o shortestPath então o menor caminho já foi encontrado
  return (biggerPaths === validMoves.length)
}

const prettyPrint = path => {
  console.log(`You made it in ${path.length - 1} moves`)
  path.forEach(square => console.log(square))
}

const knightMoves = (start, end) => {
  let queue = [[start]]
  let shortestPath = [];
  while(queue.length > 0) {
    let valid = validMoves(queue[0])
    let findShortest = findShortestPath(valid, end, queue, shortestPath)
    if (findShortest) break
    queue.shift()
  }
  return shortestPath
}

prettyPrint(knightMoves([0, 0], [7, 7]))