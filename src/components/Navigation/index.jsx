import React from "react";
import { injectIntl } from "react-intl";
import styled from "styled-components";
import Link from "gatsby-link";
import LanguageSelection from "../LanguageSelection";
import { ReactComponent as User } from "../../svg/user.svg";

const Container = styled.nav``;

const NavList = styled.ul`
  display: flex;

  margin: 0;
  padding: 0;
  list-style: none;
`;

const NavItem = styled.li`
  margin-right: 1em;

  &:last-child {
    margin-right: 0;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;

  padding: 0.5em;
  text-decoration: none;
  color: ${props => props.theme.palette.blanc};
`;

const StyledUser = styled(User)`
  width: 1.2em;
  height: 1.2em;
  margin-left: 0.75em;
  fill: currentColor;
`

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
            {messages["navigation.profile.linkText"]}<StyledUser />
          </NavLink>
        </NavItem>
      </NavList>
    </Container>
  );
};

export default injectIntl(Navigation);
