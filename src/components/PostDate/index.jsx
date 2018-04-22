import React from "react";
import moment from "moment";

class PostDate extends React.Component {
  render() {
    const { date } = this.props;
    return (
      <time dateTime={moment(new Date(date)).format("YYYY-MM-DD")}>
        {moment(new Date(date)).format("DD MMMM YYYY")}
      </time>
    );
  }
}

export default PostDate;
