import React from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { FormattedMessage } from "react-intl";

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
    const heading = this.props.whitepaper
      ? "sidebar.mailchimpBoxes.whitepaper.heading"
      : "sidebar.mailchimpBoxes.subscribe.heading";
    const body = this.props.whitepaper
      ? "sidebar.mailchimpBoxes.whitepaper.body"
      : "sidebar.mailchimpBoxes.subscribe.body";
    const buttonText = this.props.whitepaper
      ? "sidebar.mailchimpBoxes.whitepaper.buttonText"
      : "sidebar.mailchimpBoxes.subscribe.buttonText";
    return (
      <div>
        {this.state.status === `success` ? (
          <div>Thank you! Youʼll receive your first email shortly.</div>
        ) : (
          <div>
            <h2>
              <FormattedMessage id={heading} />
            </h2>
            <p>
              <FormattedMessage id={body} />
            </p>
            <form
              id="email-capture"
              method="post"
              noValidate
              onSubmit={this.handleFormSubmit}
            >
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  onChange={this.handleEmailChange}
                />
                <button type="submit">
                  <FormattedMessage id={buttonText} />
                </button>
                {this.state.status === `error` && (
                  <div dangerouslySetInnerHTML={{ __html: this.state.msg }} />
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default SubscribeForm;
