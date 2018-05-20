import React from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import Link from "gatsby-link";
import LanguageSelection from "../LanguageSelection";
import { ReactComponent as User } from "../../svg/user.svg";
import media from "../../tokens/breakpoints";

const Container = styled.nav`
  display: none;

  @media (${media.md}) {
    display: block;
  }
`;

const NavList = styled.ul`
  display: flex;

  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavItem = styled.li`
  margin-left: 1em;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;

  padding: 0.5em;
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

const Navigation = ({ intl }) => {
  const { messages } = intl;
  return (
    <Container>
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
          <LanguageSelection />
        </NavItem>
        <NavItem>
          <NavLink to={messages["navigation.profile.linkUrl"]}>
            {messages["navigation.profile.linkText"]} <StyledUser />
          </NavLink>
        </NavItem>
      </NavList>
    </Container>
  );
};

export default injectIntl(Navigation);
