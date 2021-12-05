import {
    SET_SELECTED_POSITION,
    CLEAR_SELECTION,
    RESTART_GAME
} from '../constants'
const initState = {
    rowIndex: null,
    boxIndex: null,
    selectedShape: '',
    color:''
}

export const setPosition = (rowIndex, boxIndex, selectedShape, color)=>({
    type:SET_SELECTED_POSITION,
    rowIndex,
    boxIndex,
    selectedShape,
    color
})

export const clearSelection = ()=>({
    type: CLEAR_SELECTION
})

export default (state=initState, action)=>{
    // console.log('DISPATCH', action.type, {state})
    switch (action.type) {
        case SET_SELECTED_POSITION:
            return { ...state, rowIndex: action.rowIndex, boxIndex: action.boxIndex, selectedShape: action.selectedShape, color: action.color }
        case CLEAR_SELECTION:
            return { ...initState }
        case RESTART_GAME:
            return { ...initState }
        default:
            return state
    }
}
