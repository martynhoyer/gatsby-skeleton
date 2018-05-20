import React from "react";
import styled from "styled-components";
import spacing from "../../../tokens/dimensions";

const StyledBody = styled.div`
  padding-bottom: ${spacing.xxl};
`;

const Body = ({ children }) => <StyledBody>{children}</StyledBody>;

export default Body;
