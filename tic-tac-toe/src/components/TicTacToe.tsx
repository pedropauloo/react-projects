import { useEffect, useState } from "react";
import "./tictactoe.css";

const TicTacToe = () => {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  function handleClickCell(index: number) {
    if (board[index] !== "") return;
    if (winner !== "") return;

    setBoard(
      board.map((item, itemIndex) => (itemIndex === index ? player : item))
    );

    setPlayer(player === "X" ? "O" : "X");
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

    conditionsToWin.forEach((cells) => {
      if (cells.every((cell) => cell === "O")) setWinner("O");
      if (cells.every((cell) => cell === "X")) setWinner("X");
    });

    if (board.every((cell) => cell !== "")) setWinner("T");
  }

  function restartGame() {
    setBoard(emptyBoard);
    setWinner("");
  }

  useEffect(checkWin, [board]);

  return (
    <div className="container">
      {!winner && (
        <header>
          <p className="header">
            Current player:
            <span className={`player ${player.toLowerCase()}`}>
              {" "}
              player {player}{" "}
            </span>
          </p>
        </header>
      )}
      <main className={`board ${winner && "game-over"}`}>
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
        {(winner === "X" || winner === "O") && (
          <p>
            The{" "}
            <span className={`player ${winner.toLowerCase()}`}>
              player {winner}{" "}
            </span>
            won the game!
          </p>
        )}

        {winner === "T" && <p>No one won the game.</p>}

        <button className="restart-button" type="button" onClick={restartGame}>
          Restart game
        </button>
      </footer>
    </div>
  );
};

export default TicTacToe;
