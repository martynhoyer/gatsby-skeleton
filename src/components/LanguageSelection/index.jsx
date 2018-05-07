import React, { Component } from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Cookies from "universal-cookie";
import { FormattedMessage, injectIntl } from "react-intl";
import config from "../../../data/SiteConfig";

const cookies = new Cookies();

const Container = styled.div`
  margin: 0;
  color: ${props => props.theme.palette.blanc};
`;

const StyledLink = styled(Link)`
  margin-left: 0.5em;
  text-decoration: ${props => (props.current ? "underline" : "none")};
  color: ${props => props.theme.palette.blanc};
`;

class LanguageSelection extends Component {
  handleLocaleClick = e => {
    cookies.set("lang", e.target.pathname.replace(/^\/|\/$/g, ""), {
      path: "/"
    });
  };

  render() {
    const { intl } = this.props;
    return (
      <Container>
        <FormattedMessage id="global.languagesLabel" />
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
      </Container>
    );
  }
}

export default injectIntl(LanguageSelection);
