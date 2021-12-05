import React from 'react'
import styled from 'styled-components'
import Box from './components.js/Box'
import * as shapes from './shapeNames'
import { setPosition } from '../store/reducers/selected'
import { useDispatch } from 'react-redux'

export default function TwoBoxColmn({canFit,onDragEnd}) {
    const color = 'brown'
    const dispatch = useDispatch()
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    function onMouseDown(rowIndex, boxIndex, onDragEnd){
        if (!canFit) return
        dispatch(setPosition(rowIndex, boxIndex, shapes.TWO_BOX_COLUMN, color))
    }

    return (
        <TwoBoxColmnContainer
            draggable="true"
            onDragStart={drag}
            id={shapes.TWO_BOX_COLUMN}
            name={shapes.TWO_BOX_COLUMN}
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
                onMouseDown={()=>onMouseDown(1,0)}
                canFit={canFit}
            />
        </TwoBoxColmnContainer>
    )
}

const TwoBoxColmnContainer = styled.div`
    z-index: 999;
    background: transparent;
`
