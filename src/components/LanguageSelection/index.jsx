import React, { Component } from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Cookies from "universal-cookie";
import { FormattedMessage, injectIntl } from "react-intl";
import config from "../../../data/SiteConfig";
import Popover from "../Popover";

const cookies = new Cookies();

const StyledLink = styled(Link)`
  display: block;
  padding: 0.25em 0.5em;
  text-decoration: ${props => (props.current ? "underline" : "none")};
  color: ${props => props.theme.palette.noir};

  &:hover,
  &:focus {
    background-color: ${props => props.theme.palette.rose};
    color: ${props => props.theme.palette.blanc};
  }
`;

class LanguageSelection extends Component {
  handleLocaleClick = e => {
    cookies.set("lang", e.target.pathname.replace(/^\/|\/$/g, ""), {
      path: "/"
    });
  };

  render() {
    const { intl, isBottom } = this.props;
    return (
      <Popover
        buttonText={<FormattedMessage id="global.languagesLabel" />}
        isBottom={isBottom}
      >
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
    );
  }
}

export default injectIntl(LanguageSelection);
