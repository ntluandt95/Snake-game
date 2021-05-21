import React, { useState, useEffect } from 'react'
import LinkedList from 'singly-linked-list'
import './Board.css'
import { randomInt } from '../lib/utils.js'

const Board = () => {
    // class Node {
    //     constructor(element)
    //     {
    //         this.element = element;
    //         this.next = null
    //     }
    // }
    // class SinglyLinkedList {
    //     constructor()
    //     {
    //         this.head = null;
    //         this.tail = null;
    //         this.size = 0;
    //     }
    //     add(element){
    //         const newNode = new Node(element);
    //         if(this.size == 0){
    //             this.head = newNode;
    //             this.tail = newNode;
    //             this.size++;
    //         }else{
    //             this.head.next = newNode;
    //             this.head = newNode;
    //             this.size++;
    //         }
    //         return newNode;
    //     }
    //     removeLast(){
    //         if(this.size==0) return null;
    //         const current = this.tail;
    //         if(this.size==1){
    //             this.size--;
    //             this.head = null;
    //             this.tail = null;
    //             return current;
    //         }
    //         this.tail = this.tail.next;
    //         this.size--;
    //         return current;
    //     }
    // }


    const BOARD_SIZE = 10
    const [board, setBoard] = useState(
        new Array(BOARD_SIZE).fill(0).map(row => new Array(BOARD_SIZE).fill(0)),
    )
    var [snakeCells, setSnakeCells] = useState(new Set([43, 44]))
    var [snakeList, setSnakeList] = useState(new LinkedList([44, 43]))
    var [foodCell, setFoodCell] = useState(48)
    var [currentDirection, setCurrentDirection] = useState('ArrowRight')
    var [IntervalVar, setIntervalVar] = useState(null)
    var [score, setScore] = useState(0)
    var [dead, setDead] = useState(false)
    var [begin, setBegin] = useState(false)
    // const [snakeHead, setSnakeHead] = useState(44)
    // const [snakeTail, setSnakeTail] = useState(33)

    // //return the cellType snake/food/board from index
    // window.addEventListener('keydown', e=>{

    // })
    function cellType(index) {
        if (index === foodCell) return 'food'
        if (snakeCells.has(index)) {
            return 'snake'
        } else return ''

    }

    //demo move right
    function move(direction) {
        if (begin === false) return
        var directionValue
        switch (direction) {
            case 'ArrowRight':
                directionValue = 1
                break
            case 'ArrowLeft':
                directionValue = -1
                break
            case 'ArrowUp':
                directionValue = -10
                break
            case 'ArrowDown':
                directionValue = 10
                break
            default:
                directionValue = 1;
                break

        }

        if (snakeList.head.data % 10 === 9 && directionValue === 1) {
            clearInterval(IntervalVar)
            dead = true
            setDead(dead)
            return
        }

        if (snakeList.head.data % 10 === 0 && directionValue === -1) {
            clearInterval(IntervalVar)
            dead = true
            setDead(dead)
            return
        }
        if (snakeList.head.data < 10 && directionValue === -10) {
            clearInterval(IntervalVar)
            dead = true
            setDead(dead)
            return
        }
        if (snakeList.head.data > 90 && directionValue === 10) {
            clearInterval(IntervalVar)
            dead = true
            setDead(dead)
            return
        }
        snakeList.insertFirst(parseInt(snakeList.head.data + directionValue))
        const add = snakeList.head.data
        if (snakeCells.has(add)) {
            clearInterval(IntervalVar)
            return
        }
        // const remove = snakeList.remove().data
        // console.log(direction)
        // console.log('directionValue', directionValue)
        console.log('add', add)
        // console.log('remove', remove)
        snakeCells.add(add)
        if (add !== foodCell) {
            snakeCells.delete(snakeList.remove().data)
        } else {
            var newFood = generateFood()
            setFoodCell(newFood)
            foodCell = newFood
            score += 1
            setScore(score)
            // console.log('newFood',newFood)
            // console.log('foodCell',foodCell)
        }
        var newSnakeCells = new Set(snakeCells);
        // console.log('snake singlyLinkList', snakeList)
        // console.log('newSnakeCells', newSnakeCells)
        // console.log('snakeCells', snakeCells)
        setSnakeCells(newSnakeCells)
        currentDirection = direction
        // console.log(direction)
        // console.log(snakeCells)
        // console.log(currentDirection)
    }

    useEffect(() => {
        window.addEventListener('keydown', e => {
            if (begin === false) return
            var direction = e.key
            if (direction !== restrictedDirection(currentDirection) && direction !== currentDirection) {
                //setTimeout(()=>move(direction),1000)
                move(direction)

            }

        })
        console.log('currentDirection', currentDirection);
        IntervalVar = setInterval(() => move(currentDirection), 400)
        //window.setTimeout(()=>move(currentDirection),time+=1)
    }, [])

    function generateFood() {
        //return randomInt(0, BOARD_SIZE * BOARD_SIZE - 1)
        return Math.floor(Math.random() * (BOARD_SIZE * BOARD_SIZE - 1 - 0 + 1) + 0)
    }

    function restrictedDirection(direction) {
        switch (direction) {
            case 'ArrowRight':
                return 'ArrowLeft'
            case 'ArrowLeft':
                return 'ArrowRight'
            case 'ArrowUp':
                return 'ArrowDown'
            case 'ArrowDown':
                return 'ArrowUp'
            default:
                return ''


        }
    }

    function onStart() {
        begin = true
        setBegin(begin)

    }
    function reset() {
        // setSnakeCells(new Set([43, 44]))
        // snakeCells = new Set([43, 44])
        // setSnakeList(new LinkedList([44, 43]))
        // snakeList = new LinkedList([44, 43])
        // setFoodCell(48)
        // foodCell = 48
        // setCurrentDirection('ArrowRight')
        // currentDirection = 'ArrowRight'
        // setScore(0)
        // score = 0
        // dead = false
        // setDead(false)

        // IntervalVar = setInterval(() => move(currentDirection), 1000)
        window.location.reload()
    }

    
    return (
        <>

            { !begin && <h1 className='alert'><button className='btn' onClick={onStart}>Start</button></h1>}
            { dead && <h1 className='alert'>You're Dead, Score: {score} <button className='btn' onClick={reset}>Reset</button></h1>}
            <div className="board">
                <p>Score:{score}</p>
                {

                    board.map((row, rowIndex) => (
                        <div keu={rowIndex} className='row'>

                            {row.map((cell, cellIndex) => (
                                <div key={cellIndex} className={`cell ${cellType((rowIndex) * 10 + cellIndex)}`}></div>
                            ))}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Board
