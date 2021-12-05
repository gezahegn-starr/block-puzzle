import React from 'react'
import styled from 'styled-components'
import Box from './components.js/Box'
import { setPosition } from '../store/reducers/selected'
import { useDispatch } from 'react-redux'
import * as shapes from './shapeNames'

export default function TwoByTwoL({canFit, onDragEnd}) {
    const color = 'purple'
    const dispatch = useDispatch()
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    function onMouseDown(rowIndex, boxIndex){
        if (!canFit) return
        dispatch(setPosition(rowIndex, boxIndex, shapes.TWO_BY_TWO_L, color))
    }

    return (
        <OneBlockContainer
            draggable="true"
            onDragStart={drag}
            id={shapes.TWO_BY_TWO_L}
            name={shapes.TWO_BY_TWO_L}
            onDragLeave={onDragEnd}
            onDragEnd={onDragEnd}
        >
            <Box
                color={color}
                onMouseDown={()=>onMouseDown(0,0)}
                canFit={canFit}
            />
            <Bottom>
                <Box
                    color={color}
                    onMouseDown={()=>onMouseDown(1,0)}
                    canFit={canFit}
                />
                <Box
                    color={color}
                    onMouseDown={()=>onMouseDown(1,1)}
                    canFit={canFit}
                />
            </Bottom>
        </OneBlockContainer>
    )
}

const OneBlockContainer = styled.div`
    background-color: transparent;
    z-index: 999;
`
const Bottom = styled.div`
    display: flex;
    flex-direction: row;
`
