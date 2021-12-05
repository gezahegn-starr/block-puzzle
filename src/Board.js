import React, { useEffect } from 'react'
import Row from './Row'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { restartGame, getScore as getHighScore } from './store/reducers/board'

function mapState(state){
    return {
        lostGame: state.Board.lostGame,
        score: state.Board.score,
        highScore: state.Board.highScore
    }
}

export default function Board({board}) {
    const { lostGame, score, highScore } = useSelector(mapState)
    const dispatch = useDispatch()

    function onRestartGame(){
        dispatch(restartGame())
    }

    return (
        <BoardContainer>
            {lostGame && (
                <LostMessage>
                    <div>Game Over</div>
                    {highScore < score && <p>New High Score: {score}</p>}
                    {highScore > score && <p>Your Score: {score}</p>}
                    <img src='http://cdn.onlinewebfonts.com/svg/img_529968.png' onClick={onRestartGame}/>
                </LostMessage>
            )}
            {board.map((row, index)=> <Row rowData={row} rowIndex={index} />)}
        </BoardContainer>
    )
}

const BoardContainer = styled.div`
    position: relative;
    /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px;
    padding: 10px;
`
const LostMessage = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: .8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >div{
        font-size: 30px;
        font-weight: 600;
    }
    >img{
        height: 50px;
        width: 50px;
        margin-top: 10px;
        :hover{
            width: 55px;
            height: 55px;
            cursor: pointer;

        }
    }
`

