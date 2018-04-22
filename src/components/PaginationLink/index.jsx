import React from "react";
import Link from "gatsby-link";

class PaginationLink extends React.Component {
  render() {
    if (this.props.url) {
      return <Link to={this.props.url}>{this.props.text}</Link>;
    }
    return null;
  }
}

export default PaginationLink;
