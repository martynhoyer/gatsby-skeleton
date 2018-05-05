import React from "react";
import moment from "moment";

class PostDate extends React.Component {
  render() {
    const { date, localDate, className } = this.props;
    return (
      <time
        className={className}
        dateTime={moment(new Date(date)).format("YYYY-MM-DD")}
      >
        {localDate}
      </time>
    );
  }
}

export default PostDate;
