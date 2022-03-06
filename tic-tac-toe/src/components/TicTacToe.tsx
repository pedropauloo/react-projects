import { useEffect, useState } from "react";
import "./style.css";

interface Player {
  count: number;
  character: string;
}

interface Players {
  one: Player;
  two: Player;
}
const TicTacToe = () => {
  const emptyBoard = Array(9).fill("");
  const [board, setBoard] = useState<Array<string>>(emptyBoard);
  const [players, setPlayers] = useState<Players>({
    one: {
      count: 0,
      character: "X",
    },
    two: {
      count: 0,
      character: "O",
    },
  });
  const [currentPlayer, setCurrentPlayer] = useState<Player>(players.one);
  const [winner, setWinner] = useState<Player | null>(null);

  function handleClickCell(index: number) {
    if (board[index] !== "") return;
    if (winner) return;

    setBoard(
      board.map((item, itemIndex) =>
        itemIndex === index ? currentPlayer.character : item
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
        setPlayers({ ...players });
        setWinner(players.one);
      }
      if (cells.every((cell) => cell === "O")) {
        players.two.count++;
        setPlayers({ ...players });
        setWinner(players.two);
      }
    });
  }

  function resetGame() {
    setBoard(emptyBoard);
    setWinner(null);
  }

  useEffect(checkWin, [board]);

  return (
    <div className="container">
      <div className="counter">
        <h4>Win count</h4>
        <h5>
          Player 1 ({players.one.character}): {players.one.count}
        </h5>
        <h5>
          Player 2 ({players.two.character}): {players.two.count}
        </h5>
      </div>
      {winner === null && (
        <header>
          <p className="header">
            It's
            <span className={`player ${currentPlayer.character.toLowerCase()}`}>
              {" "}
              player {currentPlayer.character}'s{" "}
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
        {(winner?.character === "X" || winner?.character === "O") && (
          <p>
            The{" "}
            <span className={`player ${winner.character.toLowerCase()}`}>
              player {winner.character}{" "}
            </span>
            won the game!
          </p>
        )}

        {board.every((cell) => cell !== "") && winner === null && (
          <p>No one won the game.</p>
        )}

        <button className="restart-button" type="button" onClick={resetGame}>
          Restart game
        </button>
      </footer>
    </div>
  );
};

export default TicTacToe;
