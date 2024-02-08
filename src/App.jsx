import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";

function App() {
  const [currentSymbol, setCurrentSymbol] = useState("X");

  function cellClickHandler() {
    setCurrentSymbol((currentSymbol) => (currentSymbol === "X" ? "O" : "X"));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={currentSymbol === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={currentSymbol === "O"}
          />
        </ol>
        <GameBoard
          onCellClick={cellClickHandler}
          currentSymbol={currentSymbol}
        />
      </div>
      GAME LOGS
    </main>
  );
}

export default App;
