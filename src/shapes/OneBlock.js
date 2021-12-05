import React from 'react'
import styled from 'styled-components'
import Box from './components.js/Box'
import * as shapes from './shapeNames'
import { setPosition } from '../store/reducers/selected'
import { useDispatch } from 'react-redux'

export default function LShape({canFit,onDragEnd}) {
    const color = 'blue'
    const dispatch = useDispatch()
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    function onMouseDown(rowIndex, boxIndex){
        if (!canFit) return
        dispatch(setPosition(rowIndex, boxIndex, shapes.ONE_BOX, color))
    }

    return (
        <OneBlockContainer
            draggable="true"
            onDragStart={drag}
            onDragLeave={onDragEnd}
            onDragEnd={onDragEnd}
            id={shapes.ONE_BOX}
            name={shapes.ONE_BOX}
        >
            <Box
                color={color}
                onMouseDown={()=>onMouseDown(0,0)}
                canFit={canFit}
            />
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
