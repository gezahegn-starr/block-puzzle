import React from 'react'
import styled from 'styled-components'
import Box from './components.js/Box'
import { setPosition } from '../store/reducers/selected'
import { useDispatch } from 'react-redux'
import * as shapes from './shapeNames'

export default function ThreeByThreeSquare({canFit, onDragEnd}) {
    const color ='#79018C'
    const dispatch = useDispatch()
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function onMouseDown(rowIndex=0, boxIndex=0){
        if (!canFit) return
        dispatch(setPosition(rowIndex, boxIndex, shapes.THREE_BY_THREE_SQUARE, color))
    }

    return (
        <ThreeByThreeSquareContainer
            draggable="true"
            onDragStart={drag}
            id={shapes.THREE_BY_THREE_SQUARE}
            name={shapes.THREE_BY_THREE_SQUARE}
            onDragLeave={onDragEnd}
            onDragEnd={onDragEnd}
        >
            <RowContainer>
                <Box
                    canFit={canFit}
                    color={color}
                    onMouseDown={()=>onMouseDown(0,0)}
                />
                <Box
                    canFit={canFit}
                    color={color}
                    onMouseDown={()=>onMouseDown(0,1)}
                />
                <Box
                    canFit={canFit}
                    color={color}
                    onMouseDown={()=>onMouseDown(0,2)}
                />
            </RowContainer>
            <RowContainer>
                <Box
                    canFit={canFit}
                    color={color}
                    onMouseDown={()=>onMouseDown(1,0)}
                />
                <Box
                    canFit={canFit}
                    color={color}
                    onMouseDown={()=>onMouseDown(1,1)}
                />
                <Box
                    canFit={canFit}
                    color={color}
                    onMouseDown={()=>onMouseDown(1,2)}
                />
            </RowContainer>
            <RowContainer>
                <Box
                    canFit={canFit}
                    color={color}
                    onMouseDown={()=>onMouseDown(2,0)}
                />
                <Box
                    canFit={canFit}
                    color={color}
                    onMouseDown={()=>onMouseDown(2,1)}
                />
                <Box
                    canFit={canFit}
                    color={color}
                    onMouseDown={()=>onMouseDown(2,2)}
                />
            </RowContainer>
        </ThreeByThreeSquareContainer>
    )
}

const ThreeByThreeSquareContainer = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 999;
`
const RowContainer = styled.div`
    display: flex;
`
