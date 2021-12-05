import * as shape from '../shapes/shapeNames'

function isNegative(rowIndex, boxIndex){
    return rowIndex < 0 || boxIndex < 0
}

function highlightLShape(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex){
    // clear preveShape
    try {
        game[prevRowIndex][prevBoxIndex].highlight = false
        game[prevRowIndex+1][prevBoxIndex].highlight = false
        game[prevRowIndex+2][prevBoxIndex].highlight = false
        game[prevRowIndex+2][prevBoxIndex+1].highlight = false
    } catch (error) {
        console.log('there was an index out of range',{game})
    }

    // try to add new highlight
    if (rowIndex < 0 || boxIndex < 0|| rowIndex + 2> 7 || boxIndex +1> 7) return game
    game[rowIndex][boxIndex].highlight = true
    game[rowIndex+1][boxIndex].highlight = true
    game[rowIndex+2][boxIndex].highlight = true
    game[rowIndex+2][boxIndex+1].highlight = true
    return game
}

function highlightOneBox(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex){
    try {
        game[prevRowIndex][prevBoxIndex].highlight = false
    } catch (error) {
        // out of range
    }
    // highlight new box
    if (rowIndex > 7 || rowIndex <0 || boxIndex < 0 || boxIndex>7) return game //out of bounds
    game[rowIndex][boxIndex].highlight = true
    return game
}

function highlightThreeBlockRow(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex){
    // unhighlight
    try {
        game[prevRowIndex][prevBoxIndex].highlight = false
        game[prevRowIndex][prevBoxIndex+1].highlight = false
        game[prevRowIndex][prevBoxIndex+2].highlight = false
    } catch (error) {

    }
    if (rowIndex > 7 || rowIndex <0 || boxIndex < 0 || boxIndex + 2>7) return game //out of bounds
    game[rowIndex][boxIndex].highlight = true
    game[rowIndex][boxIndex+1].highlight = true
    game[rowIndex][boxIndex+2].highlight = true
    return game
}

function highlightThreeByThreeSquare(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex){
    try {
        game[prevRowIndex][prevBoxIndex].highlight = false
        game[prevRowIndex][prevBoxIndex+1].highlight = false
        game[prevRowIndex][prevBoxIndex+2].highlight = false
        game[prevRowIndex+1][prevBoxIndex].highlight = false
        game[prevRowIndex+1][prevBoxIndex+1].highlight = false
        game[prevRowIndex+1][prevBoxIndex+2].highlight = false
        game[prevRowIndex+2][prevBoxIndex].highlight = false
        game[prevRowIndex+2][prevBoxIndex+1].highlight = false
        game[prevRowIndex+2][prevBoxIndex+2].highlight = false
    } catch (error) {

    }
    if (rowIndex + 2 > 7 || rowIndex <0 || boxIndex < 0 || boxIndex + 2 >7) return game
    game[rowIndex][boxIndex].highlight = true
    game[rowIndex][boxIndex+1].highlight = true
    game[rowIndex][boxIndex+2].highlight = true
    game[rowIndex+1][boxIndex].highlight = true
    game[rowIndex+1][boxIndex+1].highlight = true
    game[rowIndex+1][boxIndex+2].highlight = true
    game[rowIndex+2][boxIndex].highlight = true
    game[rowIndex+2][boxIndex+1].highlight = true
    game[rowIndex+2][boxIndex+2].highlight = true
    return game
}

function highlightTShape(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex){
    try {
        game[prevRowIndex][prevBoxIndex].highlight = false
        game[prevRowIndex][prevBoxIndex+1].highlight = false
        game[prevRowIndex][prevBoxIndex+2].highlight = false
        game[prevRowIndex+1][prevBoxIndex+1].highlight = false
    } catch (error) {}
    if (rowIndex + 1 > 7 || rowIndex <0 || boxIndex < 0 || boxIndex + 2 >7) return game
    game[rowIndex][boxIndex].highlight = true
    game[rowIndex][boxIndex+1].highlight = true
    game[rowIndex][boxIndex+2].highlight = true
    game[rowIndex+1][boxIndex+1].highlight = true
    return game
}

function highlightTwoBoxColumn(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex){
    try {
        game[prevRowIndex][prevBoxIndex].highlight = false
        game[prevRowIndex+1][prevBoxIndex].highlight = false
    } catch (error) {}
    if (rowIndex+1 > 7 || boxIndex > 7 || isNegative(rowIndex, boxIndex)) return game
    game[rowIndex][boxIndex].highlight = true
    game[rowIndex+1][boxIndex].highlight = true
    return game
}

function highlightTwoByTwoL(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex){
    try {
        game[prevRowIndex][prevBoxIndex].highlight = false
        game[prevRowIndex+1][prevBoxIndex].highlight = false
        game[prevRowIndex+1][prevBoxIndex+1].highlight = false
    } catch (error) {}
    if (rowIndex +1 > 7 || boxIndex +1 > 7 || isNegative(rowIndex, boxIndex)) return game
    game[rowIndex][boxIndex].highlight = true
    game[rowIndex+1][boxIndex].highlight = true
    game[rowIndex+1][boxIndex+1].highlight = true
    return game
}

function highlightTwoByTwoSquare(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex){
    try {
        game[prevRowIndex][prevBoxIndex].highlight = false
        game[prevRowIndex][prevBoxIndex+1].highlight = false
        game[prevRowIndex+1][prevBoxIndex].highlight = false
        game[prevRowIndex+1][prevBoxIndex+1].highlight = false
    } catch (error) {}
    if (rowIndex +1 > 7 || boxIndex + 1> 7 || isNegative(boxIndex, rowIndex)) return game
    game[rowIndex][boxIndex].highlight = true
    game[rowIndex][boxIndex+1].highlight = true
    game[rowIndex+1][boxIndex].highlight = true
    game[rowIndex+1][boxIndex+1].highlight = true
    return game
}

export default function highlighter({game,shapeName, rowIndex, boxIndex, prevRowIndex, prevBoxIndex}){
    switch (shapeName) {
        case shape.LSHAPE:
            return highlightLShape(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex)
        case shape.ONE_BOX:
            return highlightOneBox(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex)
        case shape.THREE_BOX_ROW:
            return highlightThreeBlockRow(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex)
        case shape.THREE_BY_THREE_SQUARE:
            return highlightThreeByThreeSquare(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex)
        case shape.TSHAPE:
            return highlightTShape(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex)
        case shape.TWO_BOX_COLUMN:
            return highlightTwoBoxColumn(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex)
        case shape.TWO_BY_TWO_L:
            return highlightTwoByTwoL(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex)
        case shape.TWO_BY_TWO_SQAURE:
            return highlightTwoByTwoSquare(game,rowIndex, boxIndex,prevRowIndex, prevBoxIndex)
        default:
            return game
    }
}
