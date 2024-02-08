import { useState } from "react";

const initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ onCellClick, currentSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGame);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedGameBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      updatedGameBoard[rowIndex][colIndex] = currentSymbol;
      return updatedGameBoard;
    });

    onCellClick();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
