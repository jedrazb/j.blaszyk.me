import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

import './TableOFContents.css';

const getIds = (items) => {
  return items.reduce((acc, item) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push(item.url.slice(1));
    }
    if (item.items) {
      acc.push(...getIds(item.items));
    }
    return acc;
  }, []);
};

const useActiveId = (itemIds) => {
  const [activeId, setActiveId] = useState(``);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -50% 0%` }
    );
    itemIds.forEach((id) => {
      observer.observe(document.getElementById(id));
    });
    return () => {
      itemIds.forEach((id) => {
        const elem = document.getElementById(id);
        elem && observer.unobserve(elem);
      });
    };
  }, [itemIds]);
  return activeId;
};

const renderItems = (items, activeId) => {
  return (
    <ul style={{ marginTop: '0', marginBottom: '14px' }}>
      {items.map((item) => {
        if (item.url) {
          return (
            <li key={item.url}>
              <a
                href={item.url}
                className={'toc-link'}
                style={{
                  color:
                    activeId === item.url.slice(1)
                      ? 'var(--textLink)'
                      : 'var(--textSecondary)',
                }}
              >
                {item.title}
              </a>
              {item.items && renderItems(item.items, activeId)}
            </li>
          );
        } else {
          return <>{item.items && renderItems(item.items, activeId)}</>;
        }
      })}
    </ul>
  );
};

const TableOfContents = (props) => {
  const { items, widePostType } = props;

  const idList = getIds(props.items);

  // When scrolling to the top of the post
  // no ToC element should be active
  const postHeaderId = 'post-header';
  idList.unshift(postHeaderId);

  const activeId = useActiveId(idList);
  return (
    <div
      className={classnames('table-of-contents-wrapper', {
        'table-of-contents-wide-post': !!widePostType,
      })}
    >
      <summary className="summary-toc">Contents</summary>
      {renderItems(props.items, activeId)}
    </div>
  );
};

export default TableOfContents;
