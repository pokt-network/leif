import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

import Wrapper from '../wrapper';
import Menu from "./menu";
import MobileButton from "./mobile-button";
import Logo from "./logo";
import StyledUl from "./ui";
import StyledLi from "./li";
import HeaderContainer from "./header";
import logo from '../../utils/images/pocket-logo.png';

class Header extends Component {
  state = {
    isMenuHidden: true
  };

  onToggleMenu = () => {
    this.setState((prevState) => {
      return { isMenuHidden: !prevState.isMenuHidden };
    });
  };

  render() {
    return (
      <HeaderContainer>
        <Wrapper className="header">
          <Logo href="/"> <img src={logo} alt="logo pocket" /> <span>/ &nbsp; BLOCK EXPLORER</span> </Logo>
          <Menu isHidden={this.state.isMenuHidden}>
            <StyledUl>
              <StyledLi>
                <NavLink exact activeClassName="active" to="/" onClick={this.onToggleMenu}>Home</NavLink>
              </StyledLi>
            </StyledUl>
          </Menu>
          <MobileButton onClick={this.onToggleMenu} />
        </Wrapper>
      </HeaderContainer>
    );
  }
}

export default Header;
