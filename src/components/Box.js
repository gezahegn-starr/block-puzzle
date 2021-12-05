import React from 'react'
import styled from 'styled-components'
import * as shapes from '../shapes/shapeNames'
import {  insertTShape, insertLShape, insertThreeBoxLineShape, insertOneBLock, insertTwoByTwoL, insertTwoBoxColumn, checkForCompletions, insertTwoByTwoSquare, insertThreeByThreeSquare,changeHighlightPosition } from '../store/reducers/board'
import { clearSelection } from '../store/reducers/selected'
import { useDispatch, useSelector, batch } from 'react-redux'

function mapState(state){
    return {
        pos: {
            rowIndex: state.Selected.rowIndex,
            boxIndex: state.Selected.boxIndex
        },
        prevRowIndex: state.Board.highlighted?.prevRowIndex,
        selectedShape: state.Selected.selectedShape,
        color: state.Selected.color
    }
}


export default function Box({ boxData, boxIndex, rowIndex, highlight }) {
    const dispatch = useDispatch()
    const { pos, selectedShape, color, prevRowIndex } = useSelector(mapState)
    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drop(ev) {
        ev.preventDefault();
        if (!selectedShape) return //noting selected
        var data = ev.dataTransfer.getData("text");
        const elmt = document.getElementById(data)
        if (selectedShape===shapes.TSHAPE) onInsertTShape(elmt)
        else if (selectedShape === shapes.LSHAPE) onInsertLShape(elmt)
        else if (selectedShape === shapes.THREE_BOX_ROW) onInsertThreeBoxLineShape(elmt)
        else if (selectedShape === shapes.ONE_BOX) onInsertOneBlock(elmt)
        else if (selectedShape === shapes.TWO_BY_TWO_L) onInsertTwoByTwoL(elmt)
        else if (selectedShape === shapes.TWO_BOX_COLUMN) onInsertTwoBoxColumn(elmt)
        else if (selectedShape === shapes.TWO_BY_TWO_SQAURE) onInsertTwoByTwoSquare(elmt)
        else if (selectedShape === shapes.THREE_BY_THREE_SQUARE) onInsertThreeByThreeSquare(elmt)
        batch(()=>{
            if (prevRowIndex> -1) onDragLeave()
            dispatch(clearSelection())
            dispatch(checkForCompletions())
        })
    }

    function onInsertTShape(elmt){
        const dispatchObj = { boxIndex: boxIndex - pos.boxIndex, rowIndex: rowIndex - pos.rowIndex, color }
        // elmt.remove()
        dispatch(insertTShape(dispatchObj))
    }

    function onInsertLShape(elmt){
        // elmt.remove()
        const dispatchObj = { boxIndex: boxIndex - pos.boxIndex, rowIndex: rowIndex - pos.rowIndex, color }
        dispatch(insertLShape(dispatchObj))
    }

    function onInsertThreeBoxLineShape(elmt){
        // elmt.remove()
        const dispatchObj = { boxIndex: boxIndex - pos.boxIndex, rowIndex: rowIndex - pos.rowIndex, color }
        dispatch(insertThreeBoxLineShape(dispatchObj))
    }

    function onInsertOneBlock(elmt){
        // elmt.remove()
        dispatch(insertOneBLock({boxIndex: boxIndex, rowIndex: rowIndex, color}))
    }

    function onInsertTwoByTwoL(elmt){
        // elmt.remove()
        const dispatchObj = { boxIndex: boxIndex - pos.boxIndex, rowIndex: rowIndex - pos.rowIndex, color }
        dispatch(insertTwoByTwoL(dispatchObj))
    }

    function onInsertTwoBoxColumn(elmt){
        // elmt.remove()
        const dispatchObj = { boxIndex: boxIndex - pos.boxIndex, rowIndex: rowIndex - pos.rowIndex, color }
        dispatch(insertTwoBoxColumn(dispatchObj))
    }

    function onInsertTwoByTwoSquare(elmt){
        const dispatchObj = { boxIndex: boxIndex - pos.boxIndex, rowIndex: rowIndex - pos.rowIndex, color }
        dispatch(insertTwoByTwoSquare(dispatchObj))
    }

    function onInsertThreeByThreeSquare(){
        const dispatchObj = { boxIndex: boxIndex - pos.boxIndex, rowIndex: rowIndex - pos.rowIndex, color }
        dispatch(insertThreeByThreeSquare(dispatchObj))
    }

    function onDragEnter(){
        const dispatchObj = { shapeName: selectedShape, boxIndex: boxIndex - pos.boxIndex, rowIndex: rowIndex - pos.rowIndex }
        dispatch(changeHighlightPosition(dispatchObj))
    }
    function onDragLeave(){
        const dispatchObj = { shapeName: selectedShape, boxIndex: -1, rowIndex: -1 }
        dispatch(changeHighlightPosition(dispatchObj))
    }
    return (
        <BoxContainer
            onDrop={drop}
            onDragOver={allowDrop}
            id={`box-${boxIndex}`}
            color={boxData.color}
            filled={boxData.filled}
            onDragEnter={onDragEnter}
            onDragEnd={onDragLeave}
            highlight={boxData.highlight}
        >
        </BoxContainer>
    )
}

const BoxContainer = styled.div`
    height: 50px;
    width: 50px;
    margin: 1px;
    -webkit-transition: background-color .5s ease-out;
    -moz-transition: background-color .5s ease-out;
    -o-transition: background-color .5s ease-out;
    transition: background-color .5s ease-out;
    background-color: ${p=>!p.filled ? ' #ebeeef;' : `${p.color};`};
    ${p=>p.highlight && 'border: solid 1px; height: 48px; width: 48px;'}
    @media (max-width: 768px) {
        height: 40px;
        width: 40px;
        margin: 1px;
        background-color: ${p=>p.color ? p.color + ';' : 'red;'};
        ${p=>p.highlight && 'border: solid 1px; height: 38px; width: 38px;'}
        background-color: ${p=>!p.filled ? ' #ebeeef;' : `${p.color};`};
    }
`
