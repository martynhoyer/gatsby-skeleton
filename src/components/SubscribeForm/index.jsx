import React from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { FormattedMessage, injectIntl } from "react-intl";
import styled from "styled-components";
import { hideVisually } from "polished";
import spacing, { fontsize } from "../../tokens/dimensions";

const Title = styled.h2`
  margin: 0;
  font-size: ${fontsize.base};
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;

  margin-top: ${spacing.sm};
  margin-right: -${spacing.xs};
  margin-left: -${spacing.xs};
`;

const Label = styled.label`
  flex-grow: 1;

  display: block;
  margin-top: ${spacing.sm};
  margin-right: ${spacing.xs};
  margin-left: ${spacing.xs};
`;

const LabelText = styled.span`
  ${hideVisually};
`;

const Input = styled.input`
  width: 100%;
  padding: ${spacing.sm} ${spacing.base};
  border: 1px solid ${props => props.theme.palette.grisLight};
  border-radius: ${spacing.xl};
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
`;

const SubmitButton = styled.button`
  flex-grow: 1;

  display: block;
  margin-top: ${spacing.sm};
  margin-right: ${spacing.xs};
  margin-left: ${spacing.xs};
  padding: ${spacing.sm} ${spacing.base};
  border: 1px solid ${props => props.theme.palette.rose};
  border-radius: ${spacing.xl};
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: bold;
  background-color: ${props => props.theme.palette.rose};
  color: ${props => props.theme.palette.blanc};
  cursor: pointer;
`;

class SubscribeForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ``
    };
  }

  // Update state each time user edits their email address
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  // Post to MC server & handle its response
  postEmailToMailchimp = (email, attributes) => {
    addToMailchimp(email, attributes)
      .then(result => {
        // Mailchimp always returns a 200 response
        // So we check the result for MC errors & failures
        if (result.result !== `success`) {
          this.setState({
            status: `error`,
            msg: result.msg
          });
        } else {
          // Email address succesfully subcribed to Mailchimp
          this.setState({
            status: `success`,
            msg: result.msg
          });
        }
      })
      .catch(err => {
        // Network failures, timeouts, etc
        this.setState({
          status: `error`,
          msg: err
        });
      });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState(
      {
        status: `sending`,
        msg: null
      },
      // setState callback (subscribe email to MC)
      this.postEmailToMailchimp(this.state.email, {
        LANG: this.props.locale,
        WHITEPAPER: this.props.whitepaper
      })
    );
  };

  render() {
    const { intl, formId = null } = this.props;
    const heading = this.props.whitepaper
      ? "sidebar.mailchimpBoxes.whitepaper.heading"
      : "sidebar.mailchimpBoxes.subscribe.heading";
    const body = this.props.whitepaper
      ? "sidebar.mailchimpBoxes.whitepaper.body"
      : "sidebar.mailchimpBoxes.subscribe.body";
    const buttonText = this.props.whitepaper
      ? "sidebar.mailchimpBoxes.whitepaper.buttonText"
      : "sidebar.mailchimpBoxes.subscribe.buttonText";

    const placeholder = intl.formatMessage({
      id: "sidebar.mailchimpBoxes.emailAddressPlaceholder"
    });
    return (
      <div>
        {this.state.status === `success` ? (
          <FormattedMessage id="sidebar.mailchimpBoxes.successMessage" />
        ) : (
          <div>
            <Title>
              <FormattedMessage id={heading} />
            </Title>
            <p>
              <FormattedMessage id={body} />
            </p>
            <Form
              id={formId}
              method="post"
              noValidate
              onSubmit={this.handleFormSubmit}
            >
              <Label htmlFor="email">
                <LabelText>
                  <FormattedMessage id="sidebar.mailchimpBoxes.emailAddressLabel" />
                </LabelText>
                <Input
                  type="email"
                  name="email"
                  placeholder={placeholder}
                  onChange={this.handleEmailChange}
                />
              </Label>
              <SubmitButton type="submit">
                <FormattedMessage id={buttonText} />
              </SubmitButton>
              {this.state.status === `error` && (
                <div dangerouslySetInnerHTML={{ __html: this.state.msg }} />
              )}
            </Form>
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(SubscribeForm);
