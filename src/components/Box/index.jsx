import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  padding: 32px 48px;
  box-shadow: 2.8px 2.8px 5.6px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Box = ({ children }) => {
  return <StyledBox>{children}</StyledBox>;
};

export default Box;
