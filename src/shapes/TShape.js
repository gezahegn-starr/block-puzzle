import React,{ useState } from 'react'
import styled from 'styled-components'
import Box from './components.js/Box'
import * as shapes from './shapeNames'
import { setPosition } from '../store/reducers/selected'
import { useDispatch } from 'react-redux'

export default function TShape({canFit,onDragEnd}) {
    const dispatch = useDispatch()
    const color='#77D970'

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function onMouseDown(rowIndex, boxIndex, onDragEnd){
        if (!canFit) return
        dispatch(setPosition(rowIndex, boxIndex, shapes.TSHAPE,color))
    }

    return (
        <TContainer
            draggable={canFit ? "true" : "false"}
            onDragStart={drag}
            d={shapes.TSHAPE}
            name={shapes.TSHAPE}
            onDragLeave={onDragEnd}
            onDragEnd={onDragEnd}
        >
            <TopShap>
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
            </TopShap>
            <Box
                color={color}
                onMouseDown={()=>onMouseDown(1,1)}
                canFit={canFit}
            />
        </TContainer>
    )
}

const TContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    z-index: 999;
`
const TopShap = styled.div`
    display: flex;
    flex-direction: row;
`
