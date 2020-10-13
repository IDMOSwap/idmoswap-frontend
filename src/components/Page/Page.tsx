import React from 'react'
import styled from 'styled-components'
import Footer from '../FooterNew'

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <StyledMain>{children}</StyledMain>
    <Footer />
  </StyledPage>
)

const StyledPage = styled.div``

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 504px);
  margin-bottom: 42px;
  @media (max-width: 768px) {
    min-height: calc(100vh - 281px);
  }
`

export default Page
