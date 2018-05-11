import React, { Component } from "react";
import styled, { css } from "styled-components";
import spacing from "../../tokens/dimensions";

const Container = styled.div`
  position: relative;
  margin: 0;
  color: ${props => props.theme.palette.blanc};
`;

const ToggleButton = styled.button`
  margin: initial;
  padding: 0.5em;
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

const contentPosition = ({ isBottom }) =>
  isBottom
    ? css`
        bottom: ${1 * 1.5 + 1}em;
      `
    : css`
        top: 100%;
      `;

const Content = styled.div`
  ${contentPosition};

  position: absolute;
  width: 100%;
  border-radius: ${spacing.xs};
  box-shadow: ${props => props.theme.shadows.default};
  text-align: center;
  overflow: hidden;
  background-color: ${props => props.theme.palette.blanc};

  & > * {
    position: relative;
  }
`;

class Popover extends Component {
  state = {
    isToggled: false
  };

  handleToggleClick = () => {
    if (!this.state.isToggled) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState({ isToggled: !this.state.isToggled });
  };

  handleOutsideClick = e => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleToggleClick();
  };

  render() {
    const { isBottom, buttonText, children } = this.props;
    const { isToggled } = this.state;
    return (
      <Container
        innerRef={node => {
          this.node = node;
        }}
      >
        <ToggleButton
          onClick={this.handleToggleClick}
          isToggled={isToggled}
          aria-expanded={isToggled}
        >
          {buttonText}
        </ToggleButton>
        <Content hidden={!isToggled} isBottom={isBottom}>
          {children}
        </Content>
      </Container>
    );
  }
}

export default Popover;
