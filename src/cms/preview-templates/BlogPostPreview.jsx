import React from "react";

const BlogPostPreview = ({ entry, widgetFor }) => {
  console.log(entry);
  return (
    <div>
      <div>{entry.getIn(["data", "title"])}</div>
      <div>{widgetFor("body")}</div>
      <div>{entry.getIn(["data", "description"])}</div>
      <div>{entry.getIn(["data", "tags"])}</div>
    </div>
  );
};

export default BlogPostPreview;
