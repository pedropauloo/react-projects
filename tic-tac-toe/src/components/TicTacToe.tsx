import { useEffect, useState } from "react";
import "./tictactoe.css";

type PlayerType = {
  count: number;
  currentCharacter: string;
};

const TicTacToe = () => {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [players, setPlayers] = useState([
    { count: 0, currentCharacter: "X" },
    { count: 0, currentCharacter: "O" },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [winner, setWinner] = useState<PlayerType | null>(null);

  function handleClickCell(index: number) {
    if (board[index] !== "") return;
    if (winner) return;

    setBoard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer.currentCharacter : item
      )
    );

    setCurrentPlayer(currentPlayer === players[0] ? players[1] : players[0]);
  }

  function checkWin() {
    const conditionsToWin = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],

      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],

      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];
    console.log(currentPlayer);
    conditionsToWin.forEach((cells) => {
      if (cells.every((cell) => cell === "O")) setWinner({ ...currentPlayer });
      if (cells.every((cell) => cell === "X")) setWinner({ ...currentPlayer });
    });

    if (board.every((cell) => cell !== "")) setWinner(null);
  }

  function restartGame() {
    setBoard(emptyBoard);
    setWinner(null);
  }

  useEffect(checkWin, [board]);

  return (
    <div className="container">
      <div style={{ textAlign: "center" }}>
        <h4>Win count</h4>
        {/* <h5>Player 1: {winCount.playerOne}</h5>
        <h5>Player 2: {winCount.playerTwo}</h5> */}
      </div>
      {winner !== null && (
        <header>
          <p className="header">
            Player 1
            <span
              className={`player ${currentPlayer.currentCharacter.toLowerCase()}`}
            >
              {" "}
              ({currentPlayer.currentCharacter})
            </span>
          </p>
        </header>
      )}
      <main className={`board ${winner !== null && "game-over"}`}>
        {board.map((item, index) => (
          <div
            className={`cell ${item.toLowerCase()}`}
            key={index}
            onClick={() => handleClickCell(index)}
          >
            {item}
          </div>
        ))}
      </main>
      <footer className="footer">
        {(winner?.currentCharacter === "X" ||
          winner?.currentCharacter === "O") && (
          <p>
            The{" "}
            <span className={`player ${winner.currentCharacter.toLowerCase()}`}>
              player {winner}{" "}
            </span>
            won the game!
          </p>
        )}

        {winner?.currentCharacter === "T" && <p>No one won the game.</p>}

        <button className="restart-button" type="button" onClick={restartGame}>
          Restart game
        </button>
      </footer>
    </div>
  );
};

export default TicTacToe;
