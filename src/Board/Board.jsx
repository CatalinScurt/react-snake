import React, { useState, useEffect } from "react";
import "./Board.css"
import { randomIntFromInterval, useInterval } from "../lib/utils.js"

var delay = 300;
var appleCell = 55
var prevApple = appleCell;
const wall = new Set();
const BOARD_SIZE = 15;
let index = 0
for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
        if (i === 0) wall.add(index)
        if (j === 1) wall.add(index)
        if (i === BOARD_SIZE - 1) wall.add(index)
        index++;
    }
    wall.add(index)
}

function Board() {
    const [board, setBoard] = useState(createBoard(BOARD_SIZE));
    const [snakeCells, setSnakeCells] = useState(new Set([113, 114]));
    // const [snake, setSnake] = useState(new SinglyLinkedList([61]));
    const [endGame, setEndGame] = useState(false);
    const [key, setKey] = useState("");
    const [lastKey, setLastKey] = useState("");
    //getAppleCell()

    useInterval(() => { handleKeyDown(key) }, delay)
    // if (key === "x") delay = 5000
    useEffect(() => {
        setKey('ArrowLeft')
        handleKeyDown('ArrowLeft');
        window.addEventListener("keydown", handleKeyDownn)
    }, [])

    function handleKeyDownn(event) {
        console.log(event.key)
        setKey(event.key)
    }

    function handleKeyDown(key) {
        console.log(wall.has(snakeCells[0] - 1))
        if (key !== "" && !endGame) {
            switch (key) {
                case "ArrowUp":
                    if (lastKey !== 'ArrowDown') {
                        setSnakeCells(prevItems => {
                            var last = [...prevItems];
                            console.log(last[0] - BOARD_SIZE)
                            if (wall.has(last[0] - BOARD_SIZE)) setEndGame(true)
                            if (last[0] !== prevApple) last.pop()
                            else getAppleCell()
                            last = [last[0] - BOARD_SIZE, ...last]
                            setLastKey('ArrowUp')
                            return new Set([...last])
                        })
                    } else {
                        setSnakeCells(prevItems => {
                            var last = [...prevItems];
                            if (wall.has(last[0] + BOARD_SIZE)) setEndGame(true)
                            if (last[0] !== prevApple) last.pop()
                            else getAppleCell()
                            last = [last[0] + BOARD_SIZE, ...last]
                            setLastKey('ArrowDown')
                            return new Set([...last])
                        })
                    }
                    break;
                case "ArrowRight":
                    if (lastKey !== 'ArrowLeft') {
                        setSnakeCells(prevItems => {
                            var last = [...prevItems];
                            if (wall.has(last[0] + 1)) setEndGame(true)
                            if (last[0] !== prevApple) last.pop()
                            else getAppleCell()
                            last = [last[0] + 1, ...last]
                            setLastKey('ArrowRight')
                            return new Set([...last])
                        })
                    } else {
                        setSnakeCells(prevItems => {
                            var last = [...prevItems];
                            if (wall.has(last[0] - 1)) setEndGame(true)
                            if (last[0] !== prevApple) last.pop()
                            else getAppleCell()
                            last = [last[0] - 1, ...last]
                            setLastKey('ArrowLeft')
                            return new Set([...last])
                        })
                    }
                    break;
                case "ArrowDown":
                    if (lastKey !== 'ArrowUp') {
                        setSnakeCells(prevItems => {
                            var last = [...prevItems];
                            if (wall.has(last[0] + BOARD_SIZE)) setEndGame(true)
                            if (last[0] !== prevApple) last.pop()
                            else getAppleCell()
                            last = [last[0] + BOARD_SIZE, ...last]
                            setLastKey('ArrowDown')
                            return new Set([...last])
                        })
                    } else {
                        setSnakeCells(prevItems => {
                            var last = [...prevItems];
                            if (wall.has(last[0] - BOARD_SIZE)) setEndGame(true)
                            if (last[0] !== prevApple) last.pop()
                            else getAppleCell()
                            last = [last[0] - BOARD_SIZE, ...last]
                            setLastKey('ArrowUp')
                            return new Set([...last])
                        })
                    }
                    break;
                case "ArrowLeft":
                    if (lastKey !== 'ArrowRight') {
                        setSnakeCells(prevItems => {
                            var last = [...prevItems];
                            if (wall.has(last[0] - 1)) setEndGame(true)
                            if (last[0] !== prevApple) last.pop()
                            else getAppleCell()
                            last = [last[0] - 1, ...last]
                            setLastKey('ArrowLeft')
                            return new Set([...last])
                        })
                    } else {
                        setSnakeCells(prevItems => {
                            var last = [...prevItems];
                            if (wall.has(last[0] + 1)) setEndGame(true)
                            if (last[0] !== prevApple) last.pop()
                            else getAppleCell()
                            last = [last[0] + 1, ...last]
                            setLastKey('ArrowRight')
                            return new Set([...last])
                        })
                    }
                    break;

                default:
                    console.log(key)
                    break;
            }
        }
        if (snakeCells.has(prevApple)) {
            prevApple = appleCell
        }
    }


    return (
        <div className="board">
            <p>{snakeCells.size}</p>
            {board.map((row, rowIdx) => (
                <div key={rowIdx} className="row">
                    {row.map((cellValue, cellIdx) => (
                        <div key={cellIdx} className={`cell ${snakeCells.has(cellValue) && "cell-green"} ${cellValue === appleCell && "cell-red"} ${wall.has(cellValue) && "wall"}`}></div>
                    ))}</div>
            ))}
            {endGame && <h1 className="game-over">GAME OVER</h1>}
            {endGame && <button className="play-again" onClick={() => window.location.reload()}>Play Again</button>}
        </div>);

    function createBoard() {
        let counter = 1;
        const board = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            const currentRow = [];
            for (let col = 0; col < BOARD_SIZE; col++) {
                currentRow.push(counter++);
            }
            board.push(currentRow);
        }
        return board;
    }

    function getAppleCell() {
        appleCell = randomIntFromInterval(1, BOARD_SIZE ** 2 - 1);
        while (wall.has(appleCell) === true || snakeCells.has(appleCell) === true) {
            appleCell = randomIntFromInterval(1, BOARD_SIZE ** 2 - 1);
        }
    }

}

export default Board;