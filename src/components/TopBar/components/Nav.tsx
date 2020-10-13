import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledAbsoluteLink
        href="https://www.idmoswap.com/"
        target="_blank"
      >
        Home
      </StyledAbsoluteLink>
      <StyledLink exact activeClassName="active" to="/menu">
        Menu
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/Pledge">
        Pledge
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/">
        IDMO
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/EXCHANGE">
        EXCHANGE
      </StyledLink>
      <StyledAbsoluteLink
        href="https://help.idmoswap.com/"
        target="_blank"
      >
        About
      </StyledAbsoluteLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled(NavLink)`
  color: #FFF;
  font-weight: 700;
  font-style:oblique;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #2ea7e0;
  }
  &.active {
    border:1px solid #0A0A0A;
    box-shadow: 0 0 2px 2px #5A42EC;
    border-radius: 16px;
    padding:5px 10px;
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color:  #FFF;
  font-weight: 700;
  font-style:oblique;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #2ea7e0;
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
