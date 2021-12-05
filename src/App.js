import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './Board';
import styled from 'styled-components';
import TShape from './shapes/TShape';
import { useSelector, useDispatch } from 'react-redux'
import LShape from './shapes/LShape';
import ThreeBlockLine from './shapes/ThreeBlockLine'
import OneBlock from './shapes/OneBlock'
import TwoByTwoL from './shapes/TwoByTwoL';
import TwoBoxColmn from './shapes/TwoBoxColmn';
import TwoByTwoSquare from './shapes/TwoByTwoSquare'
import ThreeByThreeSquare from './shapes/ThreeByThreeSquare'
import { chooseThreeRandShapes } from './store/reducers/board'
import * as shapes from './shapes/shapeNames'
import { checkIfShapeFits } from './store/reducers/board'
import { changeHighlightPosition } from './store/reducers/board'
import { getScore as getHighScore } from './store/reducers/board'

function mapState(state){
    return {
        board: state.Board.game,
        shapesToPlay: state.Board.shapes,
        lostGame: state.Board.lostGame,
        shapeSelected: state.Selected.selectedShape,
        score: state.Board.score,
        highScore: state.Board.highScore
    }
}

// localStorage.removeItem('highScore')

function App() {
    const dispatch = useDispatch()
    const { board, shapesToPlay, lostGame, shapeSelected, score, highScore } = useSelector(mapState)
    const [mounted,setMounted] = useState(false)

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    useEffect(()=>{
        if (!mounted){
            dispatch(chooseThreeRandShapes())
            setMounted(true)
        } else if (!lostGame && !shapesToPlay.length) dispatch(chooseThreeRandShapes())
        dispatch(checkIfShapeFits())
    },[board])

    function onDragEnd(){
        const dispatchObj = { shapeName: shapeSelected, boxIndex: -1, rowIndex: -1 }
        dispatch(changeHighlightPosition(dispatchObj))
    }

    const Shapes = {
        [shapes.TSHAPE]:(props)=> <TShape {...props}/>,
        [shapes.LSHAPE]:(props)=>  <LShape {...props} onDragEnd={onDragEnd}/>,

        [shapes.THREE_BOX_ROW]:(props)=>  <ThreeBlockLine {...props} onDragEnd={onDragEnd}/>,
        [shapes.ONE_BOX]:(props)=>  <OneBlock {...props} onDragEnd={onDragEnd}/>,
        [shapes.TWO_BY_TWO_L]:(props)=>  <TwoByTwoL {...props} onDragEnd={onDragEnd}/>,
        [shapes.TWO_BOX_COLUMN]:(props)=>  <TwoBoxColmn {...props} onDragEnd={onDragEnd}/>,
        [shapes.TWO_BY_TWO_SQAURE]:(props)=>  <TwoByTwoSquare {...props} onDragEnd={onDragEnd}/>,
        [shapes.THREE_BY_THREE_SQUARE]:(props)=>  <ThreeByThreeSquare {...props} onDragEnd={onDragEnd}/>,
    }
    return (
        <AppContainer className="App">
            <Scores>
                <div>High Score: {highScore} </div>
                {!lostGame && <div>Current Score: {score}</div>}
            </Scores>
            <Board board={board} />
            <Inventory>
                {shapesToPlay?.map(x=>Shapes[x.name](x))}
            </Inventory>
        </AppContainer>
    );
}

export default App;

const AppContainer = styled.div`
    background-color: white;
    padding: 30px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    display: flex;
    justify-content: center;
    height: 100vh;
    @media (max-width: 430px) {
        width: 100vw;
        height: calc(fit-content + 50px);
        padding: 0px;
        overflow: hidden;
    }
`

const TestBox = styled.div`
        height: 50px;
        width: 50px;
        background-color: rebeccapurple;
    >div{
        /* height: 100%;
        width: 100%; */
    }
`
const Inventory = styled.div`
    min-height: 175px;
    padding: 0px  10px;
    width: 100%;
    /* background-color: #ebeeef; */
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
`
const GameOver = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rebeccapurple;
    /* opacity: .8; */
`
const Scores = styled.div`
    margin: 10px 0px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    >div:nth-child(1){
        color: teal;
    }
    >div:nth-child(2){
        color: black;
    }
    >div{
        font-size: 18px;
    }
`
