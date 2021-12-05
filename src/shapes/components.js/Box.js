import React,{ useState } from 'react'
import styled,{ css } from 'styled-components'

export default function Box({color, onMouseDown, canFit, mouseDown}) {
    return (
        <BoxContainer
            color={color}
            onMouseDown={onMouseDown}
            canFit={canFit}
            mouseDown={mouseDown}
        >
        </BoxContainer>
    )
}

const BoxContainer = styled.div`
    height: 45px;
    width: 45px;
    margin: 1px;
    background-color: ${p=>p.color ? p.color + ';' : 'red;'};
    ${p=>!p.canFit && `background-color: lightgrey;`}
    @media (max-width: 768px) {
        height: 35px;
        width: 35px;
        margin: 1px;
        background-color: ${p=>p.color ? p.color + ';' : 'red;'};
        ${p=>!p.canFit && `background-color: lightgrey;`}
    }
`
