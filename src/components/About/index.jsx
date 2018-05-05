import React from "react";
import { FormattedMessage } from "react-intl";

const About = () => (
  <div>
    <h2>
      <FormattedMessage id="sidebar.about.heading" />
    </h2>
    <p>
      <FormattedMessage id="sidebar.about.body" />
    </p>
  </div>
);

export default About;
