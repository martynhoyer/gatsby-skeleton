import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import Cookies from "universal-cookie";
import { FormattedMessage, injectIntl } from "react-intl";
import config from "../../../data/SiteConfig";
import Popover from "../Popover";
import { ReactComponent as Globe } from "../../svg/globe.svg";

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

const StyledGlobe = styled(Globe)`
  width: 1em;
  height: 1em;
  margin-right: 0.5em;
  vertical-align: middle;
  fill: currentColor;
`;

class LanguageSelection extends Component {
  handleLocaleClick = e => {
    cookies.set("lang", e.target.pathname.replace(/^\/|\/$/g, ""), {
      path: "/"
    });
  };

  render() {
    const { intl, isBottom, isMobile } = this.props;
    return (
      <Popover
        buttonText={
          <Fragment>
            <StyledGlobe />
            <FormattedMessage id="global.languagesLabel" />
          </Fragment>
        }
        isBottom={isBottom}
        isMobile={isMobile}
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
