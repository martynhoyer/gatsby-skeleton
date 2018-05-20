import React, { Component } from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import Link from "gatsby-link";
import ScrollLock from "react-scrolllock";
import LanguageSelection from "../LanguageSelection";
import { ReactComponent as User } from "../../svg/user.svg";
import media from "../../tokens/breakpoints";

const Wrapper = styled.div`
  @media (${media.md}) {
    display: none;
  }
`;

const Popover = styled.div``;

const ContentWrapper = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.palette.violet};
  background-image: linear-gradient(
    to bottom,
    ${props => props.theme.palette.violet},
    ${props => props.theme.palette.rose} 200%
  );
  color: ${props => props.theme.palette.blanc};
  z-index: 1;
`;

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1em 0.5em;
  text-decoration: none;
  white-space: nowrap;
  color: ${props => props.theme.palette.blanc};
`;

const StyledUser = styled(User)`
  width: 1.2em;
  height: 1.2em;
  margin-left: 0.75em;
  fill: currentColor;
`;

class MobileNavigation extends Component {
  state = {
    isExpanded: false
  };

  handleToggleClick = () => {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  handleClose = () => {
    this.setState({
      isExpanded: false
    });
  };

  render() {
    const { intl } = this.props;
    const { messages } = intl;
    return (
      <Wrapper>
        <button
          onClick={this.handleToggleClick}
          aria-expanded={this.state.isExpanded}
        >
          Menu
        </button>
        {this.state.isExpanded && (
          <Popover>
            <ScrollLock />
            <ContentWrapper>
              <h2>Menu</h2>
              <NavList>
                <NavItem>
                  <NavLink to={messages["navigation.home.linkUrl"]}>
                    {messages["navigation.home.linkText"]}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to={messages["navigation.offers.linkUrl"]}>
                    {messages["navigation.offers.linkText"]}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <LanguageSelection isMobile />
                </NavItem>
                <NavItem>
                  <NavLink to={messages["navigation.profile.linkUrl"]}>
                    {messages["navigation.profile.linkText"]} <StyledUser />
                  </NavLink>
                </NavItem>
              </NavList>
              <button onClick={this.handleClose}>Close</button>
            </ContentWrapper>
          </Popover>
        )}
      </Wrapper>
    );
  }
}

export default injectIntl(MobileNavigation);
