import React, { useState } from 'react'
import styled from 'styled-components'
import Box from './components.js/Box'
import * as shapes from './shapeNames'
import { setPosition } from '../store/reducers/selected'
import { useDispatch } from 'react-redux'

export default function LShape({canFit, onDragEnd}) {
    const [mouseDown, setMouseDown] = useState(false)
    const color = '#FF0075'
    const dispatch = useDispatch()
    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        onSetMouseDown()
    }
    function onMouseDown(rowIndex, boxIndex){
        if (!canFit) return
        dispatch(setPosition(rowIndex, boxIndex, shapes.LSHAPE,color))
    }

    function onSetMouseDown(){
        setMouseDown(!mouseDown)
    }

    return (
        <LShapeContainer
            draggable="true"
            onDragStart={drag}
            onDragLeave={onDragEnd}
            onDragEnd={onDragEnd}
            id={shapes.LSHAPE}
            name={shapes.LSHAPE}
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
            <Bottom>
                <Box
                    color={color}
                    onMouseDown={()=>onMouseDown(2,0)}
                    canFit={canFit}
                />
                <Box
                    color={color}
                    onMouseDown={()=>onMouseDown(2,1)}
                    canFit={canFit}
                />
            </Bottom>
        </LShapeContainer>
    )
}

const LShapeContainer = styled.div`
    z-index: 999;
`
const Bottom = styled.div`
    display: flex;
    flex-direction: row;
    background: transparent;
`
