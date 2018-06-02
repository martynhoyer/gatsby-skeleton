import React, { Fragment, Component } from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import EmailValidator from 'email-validator'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { hideVisually, transparentize } from 'polished'
import spacing, { fontsize } from '../../tokens/dimensions'
import { ReactComponent as Cross } from '../../svg/cross.svg'
import { ReactComponent as Tick } from '../../svg/tick.svg'
import media from '../../tokens/breakpoints';

const Title = styled.h2`
  margin: 0;
  font-size: ${fontsize.md};

  @media (${media.sm}) {
    font-size: 1.125rem;
  }

  @media (${media.md}) {
    font-size: ${fontsize.base};
  }
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;

  margin-top: ${spacing.sm};
  margin-right: -${spacing.xs};
  margin-left: -${spacing.xs};
`

const Label = styled.label`
  flex-grow: 1;

  display: block;
  margin-top: ${spacing.sm};
  margin-right: ${spacing.xs};
  margin-left: ${spacing.xs};
`

const LabelText = styled.span`
  ${hideVisually};
`

const Input = styled.input`
  width: 100%;
  padding: ${spacing.sm} ${spacing.base};
  border: 1px solid ${props => props.theme.palette.grisLight};
  border-radius: ${spacing.xl};
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${spacing.xs} ${props => transparentize(0.5, props.theme.palette.grisLight)};
  }
`

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

  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${spacing.xs} ${props => transparentize(0.5, props.theme.palette.rose)};
  }
`

const MessageWrapper = styled.div`
  flex-basis: 100%;

  width: 100%;
`

const SuccessMessage = styled.p`
  display: flex;
  align-items: flex-start;

  color: ${props => props.theme.status.success};

  & > svg {
    flex-shrink: 0;

    margin-top: 0.3em;
    margin-right: 0.5em;
  }
`

const ErrorMessage = styled.p`
  display: flex;
  align-items: flex-start;

  color: ${props => props.theme.status.danger};

  & > svg {
    flex-shrink: 0;

    width: 0.8em;
    height: 0.8em;
    margin-top: 0.35em;
    margin-right: 0.5em;
  }
`

class SubscribeForm extends Component {
  state = {
    email: '',
  }

  // Update state each time user edits their email address
  handleEmailChange = e => {
    this.setState({ email: e.target.value, status: '', msg: '' })
  }

  // Post to MC server & handle its response
  postEmailToMailchimp = (email, attributes) => {
    addToMailchimp(email, attributes)
      .then(result => {
        // Mailchimp always returns a 200 response
        // So we check the result for MC errors & failures
        if (result.result !== `success`) {
          this.setState({
            status: `error`,
            msg: result.msg,
          })
        } else {
          // Email address succesfully subcribed to Mailchimp
          this.setState({
            status: `success`,
            msg: result.msg,
          })
        }
      })
      .catch(err => {
        // Network failures, timeouts, etc
        this.setState({
          status: `error`,
          msg: err,
        })
      })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    e.stopPropagation()

    if (!this.state.email || !EmailValidator.validate(this.state.email)) {
      this.setState({
        status: 'error',
        msg: this.props.intl.formatMessage({
          id: 'sidebar.mailchimpBoxes.invalidEmailMessage',
        }),
      })
      this.emailInput.focus()
      return
    }

    this.setState(
      {
        status: `sending`,
        msg: null,
      },
      // setState callback (subscribe email to MC)
      this.postEmailToMailchimp(this.state.email, {
        // send Mailchimp custom fields for segmentation
        LANG: this.props.intl.locale,
        WHITEPAPER: this.props.whitepaper || false,
      }),
    )
  }

  render() {
    const { intl, formId = null, whitepaper = false } = this.props
    const heading = whitepaper
      ? 'sidebar.mailchimpBoxes.whitepaper.heading'
      : 'sidebar.mailchimpBoxes.subscribe.heading'
    const body = whitepaper ? 'sidebar.mailchimpBoxes.whitepaper.body' : 'sidebar.mailchimpBoxes.subscribe.body'
    const buttonText = whitepaper
      ? 'sidebar.mailchimpBoxes.whitepaper.buttonText'
      : 'sidebar.mailchimpBoxes.subscribe.buttonText'

    const placeholder = intl.formatMessage({
      id: 'sidebar.mailchimpBoxes.emailAddressPlaceholder',
    })
    return (
      <Fragment>
        <Title>
          <FormattedMessage id={heading} />
        </Title>
        <p>
          <FormattedMessage id={body} />
        </p>
        <Form id={formId} method="post" noValidate onSubmit={this.handleFormSubmit}>
          <Label htmlFor="email">
            <LabelText>
              <FormattedMessage id="sidebar.mailchimpBoxes.emailAddressLabel" />
            </LabelText>
            <Input
              type="email"
              name="email"
              placeholder={placeholder}
              innerRef={el => {
                this.emailInput = el
              }}
              onChange={this.handleEmailChange}
            />
          </Label>
          <SubmitButton type="submit">
            <FormattedMessage id={buttonText} />
          </SubmitButton>
          {this.state.status === `success` && (
            <MessageWrapper>
              <SuccessMessage>
                <Tick /> {intl.formatMessage({ id: 'sidebar.mailchimpBoxes.successMessage' })}
              </SuccessMessage>
            </MessageWrapper>
          )}
          {this.state.status === `error` && (
            <MessageWrapper>
              <ErrorMessage>
                <Cross /> <span dangerouslySetInnerHTML={{ __html: this.state.msg }} />
              </ErrorMessage>
            </MessageWrapper>
          )}
        </Form>
      </Fragment>
    )
  }
}

export default injectIntl(SubscribeForm)
