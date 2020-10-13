import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
  size?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title ,size}) => {
  return (
    <Container size="lg">
      <StyledPageHeader>
        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle><span style={{fontSize:size}}>{title}</span></StyledTitle>
        <StyledSubtitle><span style={{fontSize:size}}>{subtitle}</span></StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 120px;
  height: 200px;
  line-height: 200px;
  text-align: center;
`

const StyledTitle = styled.h1`
  font-family: "Noto Sans SC", sans-serif;
  color: #524EEE;
  font-size: 100px ;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: #524EEE;
  font-size: 105px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
