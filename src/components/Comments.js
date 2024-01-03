import React from 'react';

import { Disqus } from 'gatsby-plugin-disqus';

import LazyIframe from './LazyIframe';

import './Comments.css';

const Comments = ({ url, id, title }) => {
  const disqusConfig = {
    url: url,
    identifier: id,
    title: title,
  };
  return (
    <div>
      <h3 id="comments">Comments</h3>
      <hr />
      <LazyIframe wrapperClassName={'comments-container'}>
        <Disqus config={disqusConfig} />
      </LazyIframe>
    </div>
  );
};

export default Comments;
