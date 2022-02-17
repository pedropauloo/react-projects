import { useEffect, useState } from "react";
import "./style.css";

type PlayerType = {
  count: number;
  currentCharacter: string;
};

const TicTacToe = () => {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState(emptyBoard);

  const [players, setPlayers] = useState({
    one: {
      count: 0,
      currentCharacter: "X",
    },
    two: {
      count: 0,
      currentCharacter: "O",
    },
  });

  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(players.one);
  const [winner, setWinner] = useState<PlayerType | null>(null);

  function handleClickCell(index: number) {
    if (board[index] !== "") return;
    if (winner) return;

    setBoard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer.currentCharacter : item
      )
    );

    setCurrentPlayer(currentPlayer === players.one ? players.two : players.one);
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
      if (cells.every((cell) => cell === "X")) {
        players.one.count++;
        setWinner(players.one);
      }
      if (cells.every((cell) => cell === "O")) {
        players.two.count++;
        setWinner(players.two);
      }
    });

    // if (board.every((cell) => cell !== "")) setWinner(null);
  }

  function restartGame() {
    setBoard(emptyBoard);
    setWinner(null);
  }

  useEffect(checkWin, [board]);

  return (
    <div className="container">
      <div className="counter">
        <h4>Win count</h4>
        <h5>
          Player 1 ({players.one.currentCharacter}): {players.one.count}
        </h5>
        <h5>
          Player 2 ({players.two.currentCharacter}): {players.two.count}
        </h5>
      </div>
      {winner === null && (
        <header>
          <p className="header">
            It's
            <span
              className={`player ${currentPlayer.currentCharacter.toLowerCase()}`}
            >
              {" "}
              player {currentPlayer.currentCharacter}'s{" "}
            </span>
            turn
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
              player {winner.currentCharacter}{" "}
            </span>
            won the game!
          </p>
        )}

        {board.every((cell) => cell !== "") && <p>No one won the game.</p>}

        <button className="restart-button" type="button" onClick={restartGame}>
          Restart game
        </button>
      </footer>
    </div>
  );
};

export default TicTacToe;
