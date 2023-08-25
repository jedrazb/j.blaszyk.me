import React, { useEffect } from 'react';

const Comments = () => {
  const commentsInjectionRoot = React.createRef();

  useEffect(() => {
    if (commentsInjectionRoot.current?.children.length === 0) {
      const scriptEl = document.createElement('script');
      scriptEl.setAttribute('src', 'https://utteranc.es/client.js');
      scriptEl.setAttribute('crossorigin', 'anonymous');
      scriptEl.setAttribute('async', 'true');
      scriptEl.setAttribute('repo', 'jedrazb/personal-blog');
      scriptEl.setAttribute('issue-term', 'pathname');
      scriptEl.setAttribute(
        'theme',
        `${
          (window.__theme || 'dark') == 'dark' ? 'github-dark' : 'github-light'
        }`
      );
      commentsInjectionRoot.current?.appendChild(scriptEl);
    }
  }, []);

  return (
    <div>
      <h3 id="comments">Comments</h3>
      <hr />
      <div ref={commentsInjectionRoot} />
    </div>
  );
};

export default Comments;
