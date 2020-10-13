import React from 'react'
import styled from 'styled-components'

interface ModalTitleProps {
  text?: string
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
  <StyledModalTitle>
    {text}
  </StyledModalTitle>
)

const StyledModalTitle = styled.div`
  align-items: center;
  color: #1E3F87;
  display: flex;
  font-size: 25px;
  font-weight: 700;
  height: 84px;
  justify-content: center;
`

export default ModalTitle