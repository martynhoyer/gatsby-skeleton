import React, { Component } from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Cookies from "universal-cookie";
import { FormattedMessage, injectIntl } from "react-intl";
import config from "../../../data/SiteConfig";

const cookies = new Cookies();

const Container = styled.div`
  position: relative;
  margin: 0;
  color: ${props => props.theme.palette.blanc};
`;

const ToggleButton = styled.button`
  margin: initial;
  padding: initial;
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

const StyledLink = styled(Link)`
  margin-left: 0.5em;
  text-decoration: ${props => (props.current ? "underline" : "none")};
  color: ${props => props.theme.palette.blanc};
`;

class LanguageSelection extends Component {
  state = {
    isToggled: false
  };

  handleToggleClick = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };

  handleLocaleClick = e => {
    cookies.set("lang", e.target.pathname.replace(/^\/|\/$/g, ""), {
      path: "/"
    });
  };

  render() {
    const { intl } = this.props;
    const { isToggled } = this.state;
    return (
      <Container>
        <ToggleButton
          onClick={this.handleToggleClick}
          isToggled={isToggled}
          aria-expanded={isToggled}
        >
          <FormattedMessage id="global.languagesLabel" />
        </ToggleButton>
        <div hidden={!isToggled}>
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
        </div>
      </Container>
    );
  }
}

export default injectIntl(LanguageSelection);
