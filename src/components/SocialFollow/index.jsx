import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { fontsize } from "../../tokens/dimensions";

const Title = styled.h2`
  margin: 0;
  font-size: ${fontsize.base};
`;

const SocialFollow = () => (
  <div>
    <Title>
      <FormattedMessage id="sidebar.socialMedia.heading" />
    </Title>
  </div>
);

export default SocialFollow;
