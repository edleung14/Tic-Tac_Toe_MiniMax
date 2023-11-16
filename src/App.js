import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { minimax, checkWinner } from "./util";

function App() {
  const [isPlayerFirst, setIsPlayerFirst] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [state, setState] = useState(["", "", "", "", "", "", "", "", ""]);
  const [winner, setWinner] = useState("");

  var startGame = function (playerGoesFirst) {
    setIsPlayerFirst(playerGoesFirst);
    setIsPlaying(true);

    if (!playerGoesFirst) {
      //Comp goes first, make the first move
      var tempState = state.map((c) => {
        return c;
      });
      var nextMove = minimax(tempState, "O");
      tempState[nextMove.index] = "O";
      setState(tempState);
    }
  };

  var reset = function (reset) {
    setWinner("");
    if (reset) {
      //new game
      setIsPlaying(false);
      setState(["", "", "", "", "", "", "", "", ""]);
      return;
    }
    if (!isPlayerFirst) {
      var tempState = ["", "", "", "", "", "", "", "", ""];
      var nextMove = minimax(tempState, "O");
      tempState[nextMove.index] = "O";
      setState(tempState);
    } else {
      setState(["", "", "", "", "", "", "", "", ""]);
    }
  };

  var hander = function (id) {
    if (state[id] !== "" || winner !== "") {
      return;
    }
    var tempState = state.map((c, i) => {
      if (i === id) {
        return "X";
      } else {
        return c;
      }
    });

    if (checkWinner(tempState, "X")) {
      setWinner("X");
    } else {
      var nextMove = minimax(tempState, "O");

      if (nextMove.index === undefined) {
        console.log("11");
        //Tie
        setWinner("T");
      }
      tempState[nextMove.index] = "O";
      if (checkWinner(tempState, "O")) {
        setWinner("O");
      } else if (
        !tempState.some((c) => {
          return c === "";
        }) &&
        winner === ""
      ) {
        setWinner("T");
      }
      setState(tempState);
    }
  };
  return (
    <div className="game-container">
      {isPlaying ? (
        <table id="board" className="board">
          <tbody>
            <tr>
              <td className="cell" onClick={() => hander(0)}>
                {!state[0] !== "" ? state[0] : ""}
              </td>
              <td className="cell" onClick={() => hander(1)}>
                {!state[1] !== "" ? state[1] : ""}
              </td>
              <td className="cell" onClick={() => hander(2)}>
                {!state[2] !== "" ? state[2] : ""}
              </td>
            </tr>
            <tr>
              <td className="cell" onClick={() => hander(3)}>
                {!state[3] !== "" ? state[3] : ""}
              </td>
              <td className="cell" onClick={() => hander(4)}>
                {!state[4] !== "" ? state[4] : ""}
              </td>
              <td className="cell" onClick={() => hander(5)}>
                {!state[5] !== "" ? state[5] : ""}
              </td>
            </tr>
            <tr>
              <td className="cell" onClick={() => hander(6)}>
                {!state[6] !== "" ? state[6] : ""}
              </td>
              <td className="cell" onClick={() => hander(7)}>
                {!state[7] !== "" ? state[7] : ""}
              </td>
              <td className="cell" onClick={() => hander(8)}>
                {!state[8] !== "" ? state[8] : ""}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="btn-container">
          <button
            onClick={() => {
              startGame(true);
            }}
          >
            Player Plays First
          </button>
          <button
            onClick={() => {
              startGame(false);
            }}
          >
            Computer Plays First
          </button>
        </div>
      )}
      <br />
      {winner !== "" && (
        <>
          <div className="btn-container">
            <button
              onClick={() => {
                reset(false);
              }}
            >
              Next Game
            </button>
            <button
              onClick={() => {
                reset(true);
              }}
            >
              Reset
            </button>
          </div>
          <h1>{winner === "T" ? "IT'S A TIE" : `Winner: ${winner}`}</h1>
        </>
      )}
    </div>
  );
}

export default App;
