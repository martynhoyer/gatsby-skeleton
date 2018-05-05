import React from "react";
import styled from "styled-components";
import { injectIntl } from "react-intl";
import media from "../../tokens/breakpoints";
import spacing from "../../tokens/dimensions";
import Box from "../Box";
import SubscribeForm from "../SubscribeForm";

const Container = styled.div`
  display: grid;
  grid-gap: ${spacing.md};

  @media (${media.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const PostFooterSubscribe = ({ intl }) => {
  const { locale } = intl;
  return (
    <Container>
      <Box>
        <SubscribeForm locale={locale} whitepaper />
      </Box>
      <Box>
        <SubscribeForm locale={locale} />
      </Box>
    </Container>
  );
};

export default injectIntl(PostFooterSubscribe);
