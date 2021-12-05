import React from 'react'
import styled from 'styled-components'
import Box from './components/Box'


export default function Row({rowData,rowIndex}) {
    return (
        <RowContainer id={`row-${rowIndex}`}>
            {rowData.map((box, index)=> (
                <Box
                    boxData={box}
                    boxIndex={index}
                    rowIndex={rowIndex}
                />)
            )}
        </RowContainer>
    )
}

const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
`
