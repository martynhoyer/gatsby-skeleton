import React from "react";
import moment from "moment";

class PostDate extends React.Component {
  render() {
    const { date, localDate } = this.props;
    return (
      <time dateTime={moment(new Date(date)).format("YYYY-MM-DD")}>
        {localDate}
      </time>
    );
  }
}

export default PostDate;
