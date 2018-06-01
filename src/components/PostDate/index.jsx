import React from 'react'
import moment from 'moment'

const PostDate = ({ date, localDate, className }) => (
  <time className={className} dateTime={moment(new Date(date)).format('YYYY-MM-DD')}>
    {localDate}
  </time>
)

export default PostDate
