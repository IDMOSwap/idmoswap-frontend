import React from 'react'
import styled, { keyframes } from 'styled-components'

export interface ModalProps {
  onDismiss?: () => void
}

const Modal: React.FC = ({ children }) => {
  return (
    <StyledResponsiveWrapper>
      <StyledModal>{children}</StyledModal>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} 0.3s forwards ease-out;
  }
`

const StyledModal = styled.div`
  padding: 0 20px;
  background: linear-gradient(-45deg, #F2F6FB, #E7EDF6);
  border-radius: 30px;
  @media (max-width: 768px) {
    border-radius: 0px;
  }
  box-shadow: inset 1px 1px 0px #C9CCD6;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
  max-width: 512px;
  margin: 0 auto;
  box-sizing: border-box;
`

const StyledModalContent = styled.div``

export default Modal
