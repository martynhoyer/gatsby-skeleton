import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { fontsize } from "../../tokens/dimensions";

const Title = styled.h2`
  margin: 0;
  font-size: ${fontsize.base};
`;

const About = () => (
  <div>
    <Title>
      <FormattedMessage id="sidebar.about.heading" />
    </Title>
    <p>
      <FormattedMessage id="sidebar.about.body" />
    </p>
  </div>
);

export default About;
