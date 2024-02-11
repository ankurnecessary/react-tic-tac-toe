import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const initialPlayers = { X: "Player 1", O: "Player 2" };

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }
  return activePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(initialPlayers);

  let activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = [...initialGame.map((row) => [...row])];

  gameTurns.forEach((val) => {
    const {
      square: { row, col },
      player,
    } = val;
    gameBoard[row][col] = player;
  });

  let winner;
  WINNING_COMBINATIONS.some((combination) => {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
      return true;
    }
  });

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(gameTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  let hasDraw = gameTurns.length === 9 && !winner;

  function restartHandler() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={players["X"]}
            symbol="X"
            isActive={activePlayer === "X"}
            onPlayerSave={setPlayers}
          />
          <Player
            initialName={players["O"]}
            symbol="O"
            isActive={activePlayer === "O"}
            onPlayerSave={setPlayers}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={restartHandler} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
