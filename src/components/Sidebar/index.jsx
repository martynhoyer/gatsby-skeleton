import React from "react";
import styled from "styled-components";
import Box from "../Box";

const StyledSidebar = styled.aside`
  display: grid;
  grid-gap: 16px;
  align-content: start;
`;

const Sidebar = ({ children }) => (
  <StyledSidebar>
    <Box>{children}</Box>
  </StyledSidebar>
);

export default Sidebar;
