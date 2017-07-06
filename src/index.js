import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const sideLength = 30;



function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(square) {
    let row = square[0];
    let col = square[1];
    return (
      <Square
        value={this.props.squares[(row*sideLength + col)][2]}
        onClick={() => this.props.onClick(square)}
      />
    );
  }

  renderHelper(){
    let result = [];
    for (let row = 0; row < sideLength; row++){
      let row_result = [];
      for (let col = 0; col < sideLength; col++){
        row_result.push([row, col, null]);
      }
      result.push(row_result);
    }
    return result;
  }


  render() {
    const status = 'Treasure Hunt';
    //const ele = (x) => x.map((square) => (square == treasure) ? this.renderSquare(square, true) : this.renderSquare(square, false));
    const ele = (x) => x.map((square) => this.renderSquare(square));
    const rows = this.renderHelper().map((row) => <div className = "board-row"> {ele(row)} </div>);

    return (
      <div>
        <div className="status">{status}</div>
          {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    let row = Math.floor(Math.random()*sideLength);
    let col = Math.floor(Math.random()*sideLength);
    this.state = {
          squares: this.createSquares(),
          treasure: [row, col]
      }
    };

  createSquares() {
    let array = [];
    for (let i = 0; i < sideLength; i++) {
      for (let j = 0; j < sideLength; j++) {
        array.push([i, j, null]);
      }
    }
    return array;
  }

  handleClick(square) {
   const squares = this.state.squares.slice();
   let row = square[0];
   let col = square[1];
   squares[(row*sideLength + col)][2] = getDir(row, col, this.state.treasure);
   //alert(squares[(i*10 + j)]);
   this.setState({
     squares: squares
   });

   if (row === this.state.treasure[0] && col === this.state.treasure[1]){
     alert("WINNER!!");
   }
 }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={square => this.handleClick(square)}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function getDir(row, col, [trow, tcol]){
  let possible = [];
  if (row === trow && col === tcol){
    return "X";
  }

  if (row > trow){
    possible.push("↑");
  }
  else if(row < trow){
    possible.push("↓");
  }

  if(col > tcol){
    possible.push("←");
  }
  else if(col < tcol){
    possible.push("→");
  }

  let index = Math.floor(Math.random()*possible.length);
  return possible[index];
}
