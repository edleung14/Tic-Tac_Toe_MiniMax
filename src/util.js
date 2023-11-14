// Function to check the winner
export function checkWinner(board, player) {
  const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPositions.some((position) => {
    return position.every((idx) => board[idx] === player);
  });
}

export function minimax(board, player) {
  // Base cases for the game state
  const availableMoves = board.filter((spot) => spot !== "X" && spot !== "O"); //Find Empty Moves

  var humanPlayer = "X";
  var computerPlayer = "O";

  if (checkWinner(board, humanPlayer)) {
    return { score: -10 };
  } else if (checkWinner(board, computerPlayer)) {
    return { score: 10 };
  } else if (availableMoves.length === 0) {
    return { score: 0 };
  }

  // Array to collect all moves and their scores
  const moves = [];

  // Loop through available spots
  for (let i = 0; i < board.length; i++) {
    if (board[i] !== "X" && board[i] !== "O") {
      //Found an empty spot
      const move = {};
      move.index = i; //{index : i}

      // Try the move for the current player
      board[i] = player;

      //So basically, call the function again and play the first possible free spot.
      //And it will keep doing this until a win
      if (player === computerPlayer) {
        const result = minimax(board, humanPlayer);
        move.score = result.score;
      } else {
        const result = minimax(board, computerPlayer);
        move.score = result.score;
      }

      // Reset the spot to empty
      board[i] = " ";

      // Collect the move and its score
      moves.push(move);
    }
  }

  // console.log("All the moves have considered");
  // console.table(moves);

  // Find the best move
  let bestMove;
  if (player === computerPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  // Return the chosen move (index and score)
  return moves[bestMove];
}
