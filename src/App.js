import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { minimax } from "./util";

function App() {
  const [turn, setTurn] = useState(0); //0 or 1
  const [isPlayerFirst, setIsPlayerFirst] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [state, setState] = useState(["", "", "", "", "", "", "", "", ""]);

  var startGame = function (whoGoesFirst) {
    setIsPlayerFirst(whoGoesFirst);
    setIsPlaying(true);
  };

  //Player goes first in this test
  var hander = function (id) {
    //Players Turn
    var tempState = state.map((c, i) => {
      if (i === id) {
        return "X";
      } else {
        return c;
      }
    });
    var nextMove = minimax(tempState, "O");

    tempState[nextMove.index] = "O";

    setState(tempState);
    // setTurn((turn + 2) % 2);
  };

  return (
    <div className="App">
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
      <table>
        <tbody>
          <tr>
            <td onClick={() => hander(0)}>
              0{!state[0] !== "" ? state[0] : ""}
            </td>
            <td onClick={() => hander(1)}>
              1{!state[1] !== "" ? state[1] : ""}
            </td>
            <td onClick={() => hander(2)}>
              2{!state[2] !== "" ? state[2] : ""}
            </td>
          </tr>
          <tr>
            <td onClick={() => hander(3)}>
              3{!state[3] !== "" ? state[3] : ""}
            </td>
            <td onClick={() => hander(4)}>
              4{!state[4] !== "" ? state[4] : ""}
            </td>
            <td onClick={() => hander(5)}>
              5{!state[5] !== "" ? state[5] : ""}
            </td>
          </tr>
          <tr>
            <td onClick={() => hander(6)}>
              6{!state[6] !== "" ? state[6] : ""}
            </td>
            <td onClick={() => hander(7)}>
              7{!state[7] !== "" ? state[7] : ""}
            </td>
            <td onClick={() => hander(8)}>
              8{!state[8] !== "" ? state[8] : ""}
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <h1>{`It's ${turn === 0 ? "X" : "O"} Turn`}</h1>
    </div>
  );
}

export default App;
