import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  text?: string,
  className?: string
}

const Label: React.FC<LabelProps> = ({ text, className }) => (
  !className ?
    <StyledLabel>{text}</StyledLabel>
    : <div className={className}>{text}</div>
)

const StyledLabel = styled.div`
  color:#808A98;
`

export default Label
