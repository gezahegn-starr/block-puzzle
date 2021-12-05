import React from 'react'
import styled from 'styled-components'
import Box from './components.js/Box'
import { setPosition } from '../store/reducers/selected'
import { useDispatch } from 'react-redux'
import * as shapes from './shapeNames'

export default function TwoByTwoSquare({canFit, onDragEnd}) {
    const dispatch = useDispatch()
    const color= 'black'

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function onMouseDown(rowIndex=0, boxIndex=0){
        if (!canFit) return
        dispatch(setPosition(rowIndex, boxIndex, shapes.TWO_BY_TWO_SQAURE, color))
    }

    return (
        <TwoByTwoSquareContainer
            draggable="true"
            onDragStart={drag}
            id={shapes.TWO_BY_TWO_SQAURE}
            name={shapes.TWO_BY_TWO_SQAURE}
            onDragLeave={onDragEnd}
            onDragEnd={onDragEnd}
        >
            <RowContainer>
                <Box
                    canFit={canFit}
                    onMouseDown={()=>onMouseDown(0,0)}
                    color={color}
                />
                <Box
                    canFit={canFit}
                    onMouseDown={()=>onMouseDown(1,0)}
                    color={color}
                    />
            </RowContainer>
            <RowContainer>
                <Box
                    canFit={canFit}
                    onMouseDown={()=>onMouseDown(0,1)}
                    color={color}
                />
                <Box
                    canFit={canFit}
                    onMouseDown={()=>onMouseDown(1,1)}
                    color={color}
                />
            </RowContainer>
        </TwoByTwoSquareContainer>
    )
}

const TwoByTwoSquareContainer = styled.div`
    display: flex;
    z-index: 999;
`
const RowContainer = styled.div`

`
