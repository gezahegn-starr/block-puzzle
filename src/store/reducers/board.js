import {
    INSERT_T_SHAPE,
    INSERT_L_SHAPE,
    INSERT_THREE_BOX_LINE,
    INSERT_ONE_BLOCK,
    INSERT_TWO_BY_TWO_L,
    INSERT_TWO_BOX_COLUMN,
    CHECK_FOR_COMPETIONS,
    CHECK_IF_SHAPE_FITS,
    CHOOSE_THREE_RAND_SHAPES,
    REMOVE_FROM_SHAPE_LIST,
    INSERT_TWO_BY_TWO_SQUARE,
    INSERT_THREE_BY_THREE_SQUARE,
    CHANGE_DRAG_POSITION,
    RESTART_GAME
} from '../constants'

import * as utils from '../../utils'
import * as shapesUtil from '../../shapes/shapeNames'
import highlighter from '../../utils/highlighter'

function copyObj(obj){
    return JSON.parse(JSON.stringify(obj))
}

export const insertTShape = ({rowIndex,boxIndex,color, orientation })=>({
    type: INSERT_T_SHAPE,
    rowIndex,
    boxIndex,
    color,
    orientation
})

export const insertLShape = ({rowIndex,boxIndex,color, orientation })=>({
    type: INSERT_L_SHAPE,
    rowIndex,
    boxIndex,
    color,
    orientation
})

export const insertThreeBoxLineShape = ({rowIndex,boxIndex,color, orientation })=>({
    type: INSERT_THREE_BOX_LINE,
    rowIndex,
    boxIndex,
    color,
    orientation
})

export const insertOneBLock = ({rowIndex,boxIndex,color, orientation })=>({
    type: INSERT_ONE_BLOCK,
    rowIndex,
    boxIndex,
    color,
    orientation
})

export const insertTwoByTwoL = ({rowIndex,boxIndex,color, orientation })=>({
    type: INSERT_TWO_BY_TWO_L,
    rowIndex,
    boxIndex,
    color,
    orientation
})

export const insertTwoBoxColumn = ({rowIndex,boxIndex,color, orientation })=>({
    type: INSERT_TWO_BOX_COLUMN,
    rowIndex,
    boxIndex,
    color,
    orientation
})

export const insertTwoByTwoSquare = ({rowIndex,boxIndex,color, orientation })=>({
    type: INSERT_TWO_BY_TWO_SQUARE,
    rowIndex,
    boxIndex,
    color,
    orientation
})

export const insertThreeByThreeSquare = ({rowIndex,boxIndex,color, orientation })=>({
    type: INSERT_THREE_BY_THREE_SQUARE,
    rowIndex,
    boxIndex,
    color,
    orientation
})

export const checkForCompletions = ()=>({ type: CHECK_FOR_COMPETIONS})
export const checkIfShapeFits = (shape)=>({ type: CHECK_IF_SHAPE_FITS, shape })
export const chooseThreeRandShapes = ()=>({ type: CHOOSE_THREE_RAND_SHAPES })
export const removeFromShapes = (shapeName) => ({ type: REMOVE_FROM_SHAPE_LIST, shapeName })
export const changeHighlightPosition = ({shapeName, rowIndex, boxIndex})=> ({ type: CHANGE_DRAG_POSITION, shapeName, rowIndex, boxIndex })
export const restartGame = ()=>({ type: RESTART_GAME })

function setScore(highScore){
    window.localStorage.setItem('highScore', JSON.stringify(highScore))
}

export function getScore(){
    let res = window.localStorage.getItem('highScore')
    return JSON.parse(res) || 0
}

const gameRow = Array(8).fill({ filled:false, color:'lightgrey' })

const initState = {
    game: Array(8).fill(gameRow) || [[],[],[]],
    shapes: [], //{ name: string, canFit: true|false }
    lostGame: false,
    highlighted: {
        boxIndex: null,
        rowIndex: null,
        prevRowIndex: null,
        prevBoxIndex: null
    },
    score: 0,
    highScore: getScore() || 0
}

function printBoard(board){
    const rows = board.reduce((a,c)=>{
        const res = c.reduce((d,e)=>{
            d += e.filled ? ' X ' : ' 0 '
            return d
        },'')
        a.push(res)
        return a
    },[])
}

function notNegative(rowIndex, boxIndex){
    return boxIndex > -1 && rowIndex > -1
}

function removeShape(shapes, shapeToRemove){
    // return shapes
    const index = shapes.findIndex(x=>x.name === shapeToRemove)
    let newArr = []
    for (let i=0;i<shapes.length;i++){
        if (i===index) continue
        newArr.push(shapes[i])
    }
    return newArr
}

export default (state=initState,action)=>{
    console.log('DISPATCH', action.type, {state})
    switch (action.type) {
        case CHOOSE_THREE_RAND_SHAPES:{
            const shapeNames = shapesUtil.shapesList
            const shapes = []
            for (let i=0;i<3;i++){
                const randIndex = Math.floor(Math.random() * shapeNames.length)
                shapes.push({ name: shapeNames[randIndex], canFit: true })
            //     for (let i=0;i<shapeNames.length;i++){
            //     shapes.push({ name: shapeNames[i], canFit: true })
            }
            return { ...state, shapes }
        }
        case INSERT_T_SHAPE:{
            const { rowIndex, boxIndex, color } = action
            let { score } = state
            const game = copyObj(state.game)
            let shapes = copyObj(state.shapes)
            let rowGood = false
            let bottomGood = false
            if (boxIndex + 2 < 8 && rowIndex +1 < 8 && notNegative(rowIndex, boxIndex)){
                rowGood = !game[rowIndex][boxIndex].filled
                        // && !game[rowIndex][boxIndex+1].filled
                        // && !game[rowIndex][boxIndex+2].filled
                bottomGood = !game[rowIndex+1][boxIndex+1].filled
                if (rowGood && bottomGood){
                    game[rowIndex][boxIndex] = {filled: true, color }
                    game[rowIndex][boxIndex+1] = {filled: true, color }
                    game[rowIndex][boxIndex+2] = {filled: true, color }
                    game[rowIndex+1][boxIndex+1] = {filled: true, color }
                    shapes = removeShape(shapes,shapesUtil.TSHAPE)
                    score+= 4
                }else{
                    console.log('not good row and bottom',{rowGood, bottomGood, bottomGoodVal: game[boxIndex+1][boxIndex+1]})
                }
            }else{
                console.log('index out of range',{rowIndexPlus2:rowIndex+2,rowIndex, boxIndex:boxIndex+1})
            }
            // printBoard(game)
            return { ...state, game, shapes, score }
        }
        case INSERT_L_SHAPE:{
            const { rowIndex, boxIndex, color } = action
            let { score } = state
            const game = copyObj(state.game)
            let shapes = copyObj(state.shapes)
            let colGood = false
            let bottomGood = true
            if (boxIndex +1 < 8 && rowIndex +2 < 8 && notNegative(rowIndex, boxIndex)){
                colGood = !game[rowIndex][boxIndex].filled
                            && !game[rowIndex+1][boxIndex].filled
                            && !game[rowIndex+2][boxIndex].filled
                bottomGood = !game[rowIndex+2][boxIndex+1].filled
                if (colGood && bottomGood){
                    game[rowIndex][boxIndex] = {filled: true, color }
                    game[rowIndex+1][boxIndex] = {filled: true, color }
                    game[rowIndex+2][boxIndex] = {filled: true, color }
                    game[rowIndex+2][boxIndex+1] = {filled: true, color }
                    shapes = removeShape(shapes, shapesUtil.LSHAPE)
                    score+=4
                }else{
                    console.log('not good col or bottom',{colGood, bottomGood, bottomGoodVal: game[boxIndex+1][boxIndex+1]})
                }
            }else{
                console.log('out of range',{rowIndexPlus2:rowIndex+2,rowIndex, boxIndex:boxIndex+1})
            }
            return { ...state, game, shapes, score }
        }
        case INSERT_THREE_BOX_LINE:{
            const { rowIndex, boxIndex, color } = action
            let { score } = state
            const game = copyObj(state.game)
            let shapes = copyObj(state.shapes)
            let rowGood = false
            if (boxIndex +2 < 8 && rowIndex < 8 && notNegative(rowIndex, boxIndex)){
                rowGood = !game[rowIndex][boxIndex].filled
                            && !game[rowIndex][boxIndex+1].filled
                            && !game[rowIndex][boxIndex+2].filled
                if (rowGood){
                    game[rowIndex][boxIndex] = {filled: true, color }
                    game[rowIndex][boxIndex+1] = {filled: true, color }
                    game[rowIndex][boxIndex+2] = {filled: true, color }
                    shapes = removeShape(shapes,shapesUtil.THREE_BOX_ROW)
                    score+=3
                }else{
                    console.log('not good row',{rowGood, bottomGoodVal: game[boxIndex+1][boxIndex+1]})
                }
            }else{
                console.log('out of range three line',{rowIndexPlus2:rowIndex+2,rowIndex, boxIndex:boxIndex+1})
            }
            return { ...state, game, shapes, score }
        }
        case INSERT_ONE_BLOCK:{
            const { rowIndex, boxIndex, color } = action
            let { score } = state
            const game = copyObj(state.game)
            let shapes = copyObj(state.shapes)
            if (rowIndex < 8 && boxIndex < 8 && notNegative(rowIndex, boxIndex)){
                if (!game[rowIndex][boxIndex].filled){
                    game[rowIndex][boxIndex] = { filled: true, color}
                    shapes = removeShape(shapes, shapesUtil.ONE_BOX)
                    score+=1
                }else console.log('spaced already in use')
            }else console.log('one block out of range')
            return { ...state, game, shapes, score }
        }
        case INSERT_TWO_BY_TWO_L:{
            const { rowIndex, boxIndex, color } = action
            let { score } = state
            const game = copyObj(state.game)
            let shapes = copyObj(state.shapes)
            const outOfRange = rowIndex + 1 > 7 || boxIndex +1 > 7
            if (!outOfRange && notNegative(rowIndex, boxIndex)){
                const goodFit = !game[rowIndex][boxIndex].filled
                            && !game[rowIndex+1][boxIndex].filled
                            && !game[rowIndex+1][boxIndex+1].filled
                if (goodFit){
                    const filled = true
                    game[rowIndex][boxIndex] = { filled, color }
                    game[rowIndex+1][boxIndex] = { filled, color }
                    game[rowIndex+1][boxIndex+1] = { filled, color }
                    shapes = removeShape(shapes, shapesUtil.TWO_BY_TWO_L)
                    score+=3
                }else console.log('not a good fit')
            }else console.log('out of range')
            return { ...state, game, shapes, score }
        }
        case INSERT_TWO_BOX_COLUMN:{
            const { rowIndex, boxIndex, color } = action
            let { score } = state
            const game = copyObj(state.game)
            let shapes = copyObj(state.shapes)
            const outOfRange = rowIndex + 1 > 7 || boxIndex > 7
            if (!outOfRange && notNegative(rowIndex, boxIndex)){
                const goodFit = !game[rowIndex][boxIndex].filled
                                && !game[rowIndex+1][boxIndex].filled
                if (goodFit){
                    const filled = true
                    game[rowIndex][boxIndex] = {filled, color}
                    game[rowIndex+1][boxIndex] = {filled, color}
                    shapes = removeShape(shapes,shapesUtil.TWO_BOX_COLUMN)
                    score+=2
                }else console.log('two box column not good fit')
            }else console.log('two box column out of range')
            return { ...state, game, shapes, score }
        }
        case INSERT_TWO_BY_TWO_SQUARE:{
            const { rowIndex, boxIndex, color } = action
            let { score } = state
            const game = copyObj(state.game)
            let shapes = copyObj(state.shapes)
            const outOfRange = rowIndex + 1 > 7 || boxIndex + 1> 7
            if (!outOfRange && notNegative(rowIndex, boxIndex)){
                const canFit = !game[rowIndex][boxIndex].filled
                                && !game[rowIndex][boxIndex+1].filled
                                && !game[rowIndex+1][boxIndex].filled
                                && !game[rowIndex+1][boxIndex+1].filled
                if (canFit){
                    const filled = true
                    game[rowIndex][boxIndex] = { filled, color }
                    game[rowIndex][boxIndex+1] = { filled, color }
                    game[rowIndex+1][boxIndex] = { filled, color }
                    game[rowIndex+1][boxIndex+1] = { filled, color }
                    shapes = removeShape(shapes,shapesUtil.TWO_BY_TWO_SQAURE)
                    score+=4
                }
            }
            return { ...state, game, shapes, score }
        }
        case INSERT_THREE_BY_THREE_SQUARE:{
            const { rowIndex, boxIndex, color } = action
            let { score } = state
            const game = copyObj(state.game)
            let shapes = copyObj(state.shapes)
            const outOfRange = rowIndex + 2 > 7 || boxIndex + 2 > 7
            if (!outOfRange && notNegative(rowIndex, boxIndex)){
                const rowOne = !game[rowIndex][boxIndex].filled && !game[rowIndex][boxIndex+1].filled && !game[rowIndex][boxIndex+2].filled
                const rowTwo = !game[rowIndex+1][boxIndex].filled && !game[rowIndex+1][boxIndex+1].filled && !game[rowIndex+1][boxIndex+2].filled
                const rowThree = !game[rowIndex+2][boxIndex].filled && !game[rowIndex+2][boxIndex+1].filled && !game[rowIndex+2][boxIndex+2].filled
                if (rowOne && rowTwo && rowThree){
                    const filled = { filled: true, color }
                    game[rowIndex][boxIndex] = filled
                    game[rowIndex][boxIndex+1] = filled
                    game[rowIndex][boxIndex+2] = filled
                    game[rowIndex+1][boxIndex] = filled
                    game[rowIndex+1][boxIndex+1] = filled
                    game[rowIndex+1][boxIndex+2] = filled
                    game[rowIndex+2][boxIndex] = filled
                    game[rowIndex+2][boxIndex+1] = filled
                    game[rowIndex+2][boxIndex+2] = filled
                    shapes = removeShape(shapes,shapesUtil.THREE_BY_THREE_SQUARE)
                    score += 9
                }
            }
            return { ...state, game, shapes, score }
        }
        case CHECK_FOR_COMPETIONS:{
            let { score } = state
            const game = copyObj(state.game)
            // check for row matches
            const rowsToRemove = []
            const columIndexesToCheck = {0:true,1:true,2:true,3:true,4:true,5:true,6:true,7:true}
            // check rows
            for (let i=0;i<game.length;i++){
                let filledRow = true
                for (let j=0;j< 8;j++){
                    if (!game[i][j].filled) {
                        filledRow = false
                        columIndexesToCheck[j] = false
                        break
                    }
                }
                if (filledRow){
                    rowsToRemove.push(i)
                }
            }
            // check columns
            const colsToRemove = []
            for (let i=0;i<game.length;i++){
                let filledRow = true
                for (let j=0;j< 8;j++){
                    if (!game[j][i].filled) {
                        filledRow = false
                        break
                    }
                }
                if (filledRow){
                    colsToRemove.push(i)
                }
            }
            // remove rows
            for (let i=0;i<rowsToRemove.length;i++){
                const index = rowsToRemove[i]
                game[index] = gameRow
            }
            for (let i=0;i<colsToRemove.length;i++){
                const index = colsToRemove[i]
                for (let k=0;k<game.length;k++){
                    game[k][index] = { filled:false, color:'lightgrey' }
                }
            }
            score += (rowsToRemove.length + colsToRemove.length) * 10
            return { ...state, game, score }
        }
        case CHECK_IF_SHAPE_FITS:{
            let { score, highScore } = state
            const game = copyObj(state.game)
            let shapes = copyObj(state.shapes)
            shapes = shapes.map(shape=>{
                shape.canFit = utils.checkIfShapeCanFit(shape.name, game)
                return shape
            })
            const hasMove = shapes.some(x=>x.canFit) //moves.indexOf(true)
            if (!hasMove){
                // set high score
                if (score > highScore) setScore(score)
            }
            return { ...state, shapes, lostGame: !hasMove }
        }
        case CHANGE_DRAG_POSITION:{
            const { rowIndex, boxIndex, shapeName, } = action
            const { prevRowIndex, prevBoxIndex } = state.highlighted
            let game = copyObj(state.game)
            game = highlighter({ game, shapeName, rowIndex, boxIndex, prevRowIndex, prevBoxIndex })
            return { ...state, game, highlighted:{
                ...state.highlighted,
                prevRowIndex: rowIndex,
                prevBoxIndex: boxIndex
            } }
        }
        case RESTART_GAME:
            let { score, highScore } = state
            const localScore = getScore()
            if (highScore < score) {
                setScore(score)
                highScore = score
            }
            return { ...initState, highScore }
        default:
            return state
    }
}
