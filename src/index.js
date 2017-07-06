import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
      treasure: false,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => this.treasure ? alert("you win") : this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(100).fill(null),
    };
  }

  renderSquare(i, t) {
    return <Square value={i} treasure={t}/>;
  }

  renderHelper(){
    let result = [];
    for (let row = 0; row < 10; row++){
      let row_result = [];
      for (let col = 0; col < 10; col++){
        row_result.push(row*10 + col);
      }
      result.push(row_result);
    }
    return result;
  }


  render() {
    const status = 'Treasure Hunt';
    const treasure = Math.floor(Math.random()*100);
    const ele = (x) => x.map((square) => (square == treasure) ? this.renderSquare(square, true) : this.renderSquare(square, false));

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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
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
