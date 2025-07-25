import { useState } from "react";

// 计算是否获取胜利
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    // 0,1,2
    const [a, b, c] = lines[i];
    // squares 是一个数组值 ["X","O",null,null,null,null,null,null,null];
    // 获取 squares 每一次对应索引的值是否符合
    // 当三个相等时，就返回原始的，并判定为胜
    // a=0 b=1 c=2
    // squares[0]!=null && squares[0]===squares[1] && squares[0]===squares[2])
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ value, onSquareClick }) {
  // // useState是react的hook，只返回数组，两个参数，形成结果如下
  // /**
  //   function useState(initial) {
  //     let currentValue = initial;
  //     function updateValue(newValue) {
  //       currentValue = newValue;
  //       // React 触发重新渲染
  //     }
  //     return [currentValue, updateValue];
  //   }
  //  */
  // const [value, updateValue] = useState(null);

  // function handleClick() {
  //   updateValue("X");
  //   // 如果你希望看到真正“更新之后”的值，可以用 useEffect()：
  //   /**
  //    *
  //    * useEffect(() => {
  //        console.log(value);
  //     }, [count]);
  //    *
  //    */
  //   // 这里还是会打印出默认的null,因为更新是异步的，但是render函数例外，
  //   // 有自己的更新机制
  //   console.log(value);
  // }
  return (
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // 已点击过的格子再次点击时不能再改变，需要判断一下；
    // 如果已经赢的情况下也停止响应
    if (squares[i] || calculateWinner(squares)) return;
    // 变性使复杂的功能更容易实现。在本教程的后面，你将实现一个“时间旅行”功能，让你回顾游戏的历史并“跳回”到过去的动作。此功能并非特定于游戏——撤消和重做某些操作的能力是应用程序的常见要求。避免数据直接突变可以让你保持以前版本的数据完好无损，并在以后重用它们。
    //不变性还有另一个好处。默认情况下，当父组件的 state 发生变化时，所有子组件都会自动重新渲染。这甚至包括未受变化影响的子组件。尽管重新渲染本身不会引起用户注意（你不应该主动尝试避免它！），但出于性能原因，你可能希望跳过重新渲染显然不受其影响的树的一部分。不变性使得组件比较其数据是否已更改的成本非常低。你可以在 memo API 参考 中了解更多关于 React 如何选择何时重新渲染组件的信息。
    const nextSquares = squares.slice();
    // “如果当前是 X 的回合（xIsNext 为 true）：把 X 放进 nextSquares[i]（点击的那一格）”
    // 标识当前是否是属于 “X” 的回合，一般游戏初始第一次都是X
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div>{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
        ></Square>
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
        ></Square>
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
        ></Square>
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
        ></Square>
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
        ></Square>
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
        ></Square>
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
        ></Square>
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
        ></Square>
      </div>
    </>
  );
}
