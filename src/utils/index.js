import * as shapes from '../shapes/shapeNames'

function checkIfTShapFits(game){
    let iCount = 0
    let canFit = false
    while (iCount < 8){
        for (let j=0;j<8;j++){
            if (j+2> 7 || iCount+1>7) break; // out of bounds
            const top = game[iCount][j]
            const middle = game[iCount][j+1]
            const right = game[iCount][j+2]
            const bottom = game[iCount+1][j+1]
            const check = !top.filled && !middle.filled && !right.filled && !bottom.filled
            if (check) {
                canFit = true
                break
            }
        }
        iCount++;
        if (canFit) break
    }
    return canFit
}

function checkIfLShapeFits(game){
    let canFit = false
    for (let i=0;i<8;i++){
        for (let j=0;j<8;j++){
            if (i+2>7 || j+1>7) break; //out of bounds
            const top = game[i][j]
            const middle = game[i+1][j]
            const bottom = game[i+2][j]
            const bottomRight = game[i+2][j+1]
            const fits = !top.filled && !middle.filled && !bottom.filled && !bottomRight.filled
            if (fits){
                canFit = true
                break
            }
        }
        if (canFit) break // done searching
    }
    return canFit
}

function checkIfOneBoxFits(game){
    let canFit = false
    for (let i=0;i<8;i++){
        for (let j=0;j<8;j++){
            if (!game[i][j].filled){
                canFit = true
                break
            }
        }
        if (canFit) break // done searching
    }
    return canFit
}

function checkIfThreeBoxRowFits(game){
    let canFit = false
    for (let i=0;i<8;i++){
        for (let j=0;j<8;j++){
            if (j+2>7) break// out of bounds
            const left = game[i][j]
            const middle = game[i][j+1]
            const right = game[i][j+2]
            canFit = !left.filled && !middle.filled && !right.filled
            if (canFit) break; // found match
        }
        if (canFit) break; // found match
    }
    return canFit
}

function checkTwoBoxColumnFits(game){
    let canFit = false;
    for (let i=0;i<8;i++){
        for (let j=0;j<8;j++){
            if (i+1>7) break// out of bounds
            const top = game[i][j]
            const bottom = game[i+1][j]
            canFit = !top.filled && !bottom.filled
            if (canFit) break; // found match
        }
        if (canFit) break; // found match
    }
    return canFit
}

function checkTwoByTwoLFits(game){
    let canFit = false;
    for (let i=0;i<8;i++){
        for (let j=0;j<8;j++){
            if (j+1>7 || i+1> 7) break// out of bounds
            const top = game[i][j]
            const bottom = game[i+1][j]
            const bottomRight = game[i+1][j+1]
            canFit = !top.filled && !bottom.filled && !bottomRight.filled
            if (canFit) break; // found match
        }
        if (canFit) break; // found match
    }
    return canFit
}

function checkTwoByTwoSquareFits(game){
    let canFit = false;
    for (let i=0;i<8;i++){
        for (let j=0;j<8;j++){
            if (j+1>7 || i+1> 7) break// out of bounds
            const topLeft = game[i][j]
            const topRight = game[i][j+1]
            const bottom = game[i+1][j]
            const bottomRight = game[i+1][j+1]
            canFit = !topLeft.filled && !topRight.filled && !bottom.filled && !bottomRight.filled
            if (canFit) break; // found match
        }
        if (canFit) break; // found match
    }
    return canFit
}

function checkThreeByThreeSquareFits(game){
    let canFit = false;
    for (let i=0;i<8;i++){
        for (let j=0;j<8;j++){
            if (j+2>7 || i+2> 7) break// out of bounds
            const top = !game[i][j].filled && !game[i][j+1].filled && !game[i][j+2].filled
            const middle = !game[i+1][j].filled && !game[i+1][j+1].filled && !game[i+1][j+2].filled
            const bottom = !game[i+2][j].filled && !game[i+2][j+1].filled && !game[i+2][j+2].filled
            canFit = top && middle && bottom
            if (canFit) break; // found match
        }
        if (canFit) break; // found match
    }
    return canFit
}

export const checkIfShapeCanFit = (shapeName,game)=>{
    if (shapeName === shapes.LSHAPE) return checkIfLShapeFits(game)
    if (shapeName === shapes.ONE_BOX) return checkIfOneBoxFits(game)
    if (shapeName === shapes.THREE_BOX_ROW) return checkIfThreeBoxRowFits(game)
    if (shapeName === shapes.TSHAPE) return checkIfTShapFits(game)
    if (shapeName === shapes.TWO_BOX_COLUMN) return checkTwoBoxColumnFits(game)
    if (shapeName === shapes.TWO_BY_TWO_L) return checkTwoByTwoLFits(game)
    if (shapeName === shapes.TWO_BY_TWO_SQAURE) return checkTwoByTwoSquareFits(game)
    if (shapeName === shapes.THREE_BY_THREE_SQUARE) return checkThreeByThreeSquareFits(game)
    console.log('Unknow shape to check')
    return false
}
