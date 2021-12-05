import React,{ useState } from 'react'
import styled from 'styled-components'
import Box from './components.js/Box'
import * as shapes from './shapeNames'
import { setPosition } from '../store/reducers/selected'
import { useDispatch } from 'react-redux'

export default function ThreeBlockLine({canFit, onDragEnd}) {
    const dispatch = useDispatch()
    const color = '#172774'
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function onMouseDown(rowIndex, boxIndex){
        if (!canFit) return
        dispatch(setPosition(rowIndex, boxIndex, shapes.THREE_BOX_ROW, color))
    }


    return (
        <ThreeBlockLineContainer
            draggable="true" onDragStart={drag}
            id={shapes.THREE_BOX_ROW}
            name={shapes.THREE_BOX_ROW}
            onDragLeave={onDragEnd}
            onDragEnd={onDragEnd}
        >
            <Box
                color={color}
                onMouseDown={()=>onMouseDown(0,0)}
                canFit={canFit}
            />
            <Box
                color={color}
                onMouseDown={()=>onMouseDown(0,1)}
                canFit={canFit}
            />
            <Box
                color={color}
                onMouseDown={()=>onMouseDown(0,2)}
                canFit={canFit}
            />
        </ThreeBlockLineContainer>
    )
}

const ThreeBlockLineContainer = styled.div`
    display: flex;
    z-index: 999;
    background-color: transparent;
`
