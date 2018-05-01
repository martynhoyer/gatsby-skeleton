import React from "react";
import moment from "moment";
import config from "../../../data/SiteConfig";

class PostDate extends React.Component {
  render() {
    const { date, locale = config.defaultLangKey } = this.props;
    moment.locale(locale);
    return (
      <time dateTime={moment(new Date(date)).format("YYYY-MM-DD")}>
        {moment(new Date(date)).format("DD MMMM YYYY")}
      </time>
    );
  }
}

export default PostDate;
