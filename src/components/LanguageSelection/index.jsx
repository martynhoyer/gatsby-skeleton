import React, { Component } from "react";
import styled, { css } from "styled-components";
import Link from "gatsby-link";
import Cookies from "universal-cookie";
import { FormattedMessage, injectIntl } from "react-intl";
import config from "../../../data/SiteConfig";
import spacing from "../../tokens/dimensions";

const cookies = new Cookies();

const Container = styled.div`
  position: relative;
  margin: 0;
  color: ${props => props.theme.palette.blanc};
`;

const ToggleButton = styled.button`
  margin: initial;
  padding: 0.5em;
  border: 0;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-align: inherit;
  text-transform: inherit;
  background-color: transparent;
  color: inherit;
`;

const popoverPosition = ({ isBottom }) =>
  isBottom
    ? css`
        bottom: ${1 * 1.5 + 1}em;
      `
    : css`
        top: 100%;
      `;

const Popover = styled.div`
  ${popoverPosition};

  position: absolute;
  width: 100%;
  border-radius: ${spacing.xs};
  box-shadow: ${props => props.theme.shadows.default};
  background-color: ${props => props.theme.palette.blanc};
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 0.25em 0.5em;
  text-decoration: ${props => (props.current ? "underline" : "none")};
  color: ${props => props.theme.palette.noir};
`;

class LanguageSelection extends Component {
  state = {
    isToggled: false
  };

  handleToggleClick = () => {
    if (!this.state.isToggled) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState({ isToggled: !this.state.isToggled });
  };

  handleLocaleClick = e => {
    cookies.set("lang", e.target.pathname.replace(/^\/|\/$/g, ""), {
      path: "/"
    });
  };

  handleOutsideClick = e => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleToggleClick();
  };

  render() {
    const { intl, isBottom } = this.props;
    const { isToggled } = this.state;
    return (
      <Container
        innerRef={node => {
          this.node = node;
        }}
      >
        <ToggleButton
          onClick={this.handleToggleClick}
          isToggled={isToggled}
          aria-expanded={isToggled}
        >
          <FormattedMessage id="global.languagesLabel" />
        </ToggleButton>
        <Popover hidden={!isToggled} isBottom={isBottom}>
          {config.locales.map(locale => (
            <StyledLink
              current={intl.locale === locale}
              key={locale}
              to={`/${locale}/`}
              onClick={this.handleLocaleClick}
            >
              {locale}
            </StyledLink>
          ))}
        </Popover>
      </Container>
    );
  }
}

export default injectIntl(LanguageSelection);
